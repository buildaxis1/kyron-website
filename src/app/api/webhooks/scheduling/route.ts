import { NextResponse } from "next/server";

export const runtime = "nodejs"; // ensure Node runtime (not edge)

export async function OPTIONS() {
  return NextResponse.json({ ok: true }, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // TODO: validate body + persist to DB
    // Minimal: accept the webhook so the microservice stops retrying
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 }
    );
  }
}
