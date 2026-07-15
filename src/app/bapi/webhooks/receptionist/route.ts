import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { Action } from "@prisma/client";

export const runtime = "nodejs";

// Event schema validation
const WebhookEventSchema = z.object({
  event: z.enum([
    "schedule_preview",
    "schedule_commit",
    "schedule_transfer",
    "schedule_error",
  ]),
  call_id: z.string(),
  org_slug: z.string(),
  encounter_id: z.string().nullable(),
  payload: z.record(z.unknown()),
  ts: z.string(),
});

/**
 * Verify webhook signature using shared secret
 */
function verifySignature(
  request: NextRequest,
  secret: string,
): boolean {
  // Simple header-based verification
  // Expect a header like "X-Webhook-Token" or "Authorization: Bearer <secret>"
  const authHeader = request.headers.get("authorization");
  const tokenHeader = request.headers.get("x-webhook-token");

  const providedToken = authHeader?.replace("Bearer ", "") || tokenHeader;

  if (!providedToken) {
    return false;
  }

  return providedToken === secret;
}

/**
 * POST /bapi/webhooks/receptionist
 * Webhook receiver for receptionist scheduling events
 */
export async function POST(request: NextRequest) {
  try {
    // Get webhook secret from environment
    const secret = process.env.RECEPTIONIST_WEBHOOK_SECRET;
    if (!secret) {
      console.error("RECEPTIONIST_WEBHOOK_SECRET not configured");
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 },
      );
    }

    // Verify signature
    if (!verifySignature(request, secret)) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 },
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate event schema
    const validationResult = WebhookEventSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid event schema",
          details: validationResult.error.errors,
        },
        { status: 400 },
      );
    }

    const event = validationResult.data;

    // Find organizationId from encounter if encounter_id is provided
    let organizationId: string | null = null;
    let encounterId: string | null = null;

    if (event.encounter_id) {
      try {
        const encounter = await prisma.encounter.findUnique({
          where: { id: event.encounter_id },
          select: { id: true, organizationId: true },
        });

        if (encounter) {
          encounterId = encounter.id;
          organizationId = encounter.organizationId;
        }
      } catch (error) {
        console.error("Error finding encounter:", error);
        // Continue without encounter - we'll still store the event
      }
    }

    // Determine action type
    // Since SCHEDULING doesn't exist in Action enum, use a generic type
    // We'll use ELIGIBILITY_AND_BENEFITS as a placeholder and rely on structuredData.event
    // Alternatively, we could use any existing type - let's use ELIGIBILITY_AND_BENEFITS
    // The UI will filter by structuredData.event starting with "schedule_"
    const actionType: Action = Action.ELIGIBILITY_AND_BENEFITS;

    // Create summary from event
    const summary = `${event.event}: ${
      event.payload?.status || event.payload?.reason_code || "processed"
    }`;

    // Store event as OrganizationAction
    // If no encounter_id, we need to create a minimal encounter or store without encounterId
    // For now, if encounter_id is null, we'll skip creating the action
    // (or we could create it with a placeholder encounter - but that's not ideal)
    // Actually, let's check if we can create it without encounterId requirement
    // Looking at the schema, encounterId is required (not nullable)
    // So we'll only create if encounter_id is provided

    if (!encounterId) {
      // Log the event but don't persist if no encounter
      // OrganizationAction requires encounterId, so we can't store without it
      console.warn(
        `Webhook event received without valid encounter_id: ${event.event} for call ${event.call_id}. Event logged but not persisted.`,
      );
      // Return 200 to acknowledge receipt, but event won't be persisted
      return NextResponse.json(
        {
          success: true,
          warning: "encounter_id is null or invalid - event not persisted",
          received: event.encounter_id,
        },
        { status: 200 },
      );
    }

    // Create the OrganizationAction
    await prisma.organizationAction.create({
      data: {
        encounterId: encounterId,
        date: new Date(event.ts),
        type: actionType,
        summary: summary,
        structuredData: event as unknown as Record<string, unknown>, // Store full event
        organizationId: organizationId,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
