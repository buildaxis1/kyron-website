// server-only: placeholder in-process ModMed sync
import prisma from "@/lib/prisma";
import { getModMedSandboxToken, trimSlash } from "./modmed";
import { getSecretParam } from "./ssm";

export async function runModMedSync(practiceId: string) {

  // update when modmed was last synced (syncCursor table)
  const cursor = await prisma.syncCursor.upsert({
    where: { practiceId_resource: { practiceId, resource: "Patient" } },
    update: {},
    create: {
      practiceId,
      resource: "Patient",
      since: new Date(0),
      status: "OK"
    }
  });

  const since = cursor.since.toISOString();

  const p = await prisma.practice.findUniqueOrThrow({
    where: { id: practiceId },
    select: {
      id: true,
      name: true,
      organizationId: true,
      fhirBaseUrl: true,
      ssmUsernameParam: true,
      ssmPasswordParam: true,
      ssmClientIdParam: true,
      ssmClientSecretParam: true,
      ssmApiKeyParam: true,
    },
  });

  if (!p.ssmUsernameParam || !p.ssmPasswordParam) {
    throw new Error(
      "SSM username/password parameters are not configured for this practice.",
    );
  }

  const { access_token } = await getModMedSandboxToken({
    fhirBaseUrl: p.fhirBaseUrl,
    ssmUsernameParam: p.ssmUsernameParam,
    ssmPasswordParam: p.ssmPasswordParam,
    ssmClientIdParam: p.ssmClientIdParam,
    ssmClientSecretParam: p.ssmClientSecretParam,
    ssmApiKeyParam: p.ssmApiKeyParam ?? undefined,
  });

  const xApiKey = p.ssmApiKeyParam
    ? await getSecretParam(p.ssmApiKeyParam)
    : "";

  // 1) Fetch a page of sandbox patients to import

  // old fetch
  // const listRes = await fetch(`${trimSlash(p.fhirBaseUrl)}/Patient?_count=25`, {
  //   headers: {
  //     Authorization: `Bearer ${access_token}`,
  //     ...(xApiKey ? { "x-api-key": xApiKey } : {}),
  //   },
  // });

  // new fetch with lastUpdated param
  const date = since.slice(0, 10);
  const url =
    `${trimSlash(p.fhirBaseUrl)}/Patient` +
    `?_count=25&_lastUpdated=gt${encodeURIComponent(date)}`;

  const listRes = await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      ...(xApiKey ? { "x-api-key": xApiKey } : {})
    }
  });


  if (!listRes.ok) {
    return { ok: false as const, status: listRes.status };
  }

  type FhirHumanName = { family?: string; given?: string[]; text?: string };
  type FhirTelecom = { system?: string; value?: string };
  type FhirAddress = {
    line?: string[];
    city?: string;
    state?: string;
    postalCode?: string;
  };
  type FhirPatient = {
    resourceType: "Patient";
    id?: string;
    name?: FhirHumanName[];
    gender?: string;
    birthDate?: string;
    telecom?: FhirTelecom[];
    address?: FhirAddress[];
  };
  type FhirBundle = { entry?: Array<{ resource?: unknown }> };

  const bundle = (await listRes.json()) as FhirBundle;
  const patients = (bundle.entry ?? [])
    .map((e) => e.resource)
    .filter((resource): resource is FhirPatient => {
      if (typeof resource !== "object" || resource === null) return false;
      const candidate = resource as { resourceType?: unknown };
      return candidate.resourceType === "Patient";
    });

  if (!p.organizationId || patients.length === 0) {
    return { ok: true as const, status: 200 as const };
  }

  // 2) Upsert lightweight Physician/Facility once per practice
  const physicianId = `sandbox-physician-${p.id}`;
  const facilityId = `sandbox-facility-${p.id}`;
  const DEFAULT_INSURER_NAME = "Sandbox Insurance";
  const DEFAULT_INSURER_PHONE = "5556019004";

  await prisma.$transaction(async (tx) => {
    await tx.physician.upsert({
      where: { id: physicianId },
      update: { physicianName: `${p.name ?? "Sandbox"} Physician` },
      create: {
        id: physicianId,
        physicianName: `${p.name ?? "Sandbox"} Physician`,
        physicianNPI: "9999999999",
        version: 1,
      },
    });

    await tx.facility.upsert({
      where: { id: facilityId },
      update: { name: `${p.name ?? "ModMed"} Sandbox Clinic` },
      create: {
        id: facilityId,
        name: `${p.name ?? "ModMed"} Sandbox Clinic`,
        facilityNPI: "8888888888",
        address: "123 Demo Street",
        city: "Demo City",
        state: "CA",
        zipCode: "00000",
        version: 1,
      },
    });

    // 3) Upsert each Patient + a minimal Encounter
    for (const fp of patients) {
      const fhirId = fp.id ?? cryptoRandomId();
      const patientId = `sandbox-patient-${fhirId}`;
      const encounterId = `sandbox-encounter-${fhirId}`;

      const primaryName = fp.name?.[0];
      const first =
        primaryName?.given?.[0] ??
        primaryName?.text?.split(/\s+/)[0] ??
        "Sandbox";
      const last =
        primaryName?.family ??
        (primaryName?.text
          ? primaryName.text.split(/\s+/).slice(-1)[0]
          : "Patient");

      const addr = fp.address?.[0];
      const addressLine = (addr?.line ?? []).join(" ") || null;
      const city = addr?.city ?? null;
      const state = addr?.state ?? null;
      const postalCode = addr?.postalCode ?? null;
      const phone =
        fp.telecom?.find((t) => t.system === "phone")?.value ?? null;

      await tx.patient.upsert({
        where: { id: patientId },
        update: {
          firstName: first,
          lastName: last,
          dob: fp.birthDate ?? "1900-01-01T00:00:00.000Z",
          sex: fp.gender ?? null,
          address: addressLine,
          city,
          state,
          zipCode: postalCode,
          phone,
          organizationId: p.organizationId,
        },
        create: {
          id: patientId,
          patientId: fp.id ?? "missing_patient_id",
          firstName: first,
          lastName: last,
          dob: fp.birthDate ?? "1900-01-01T00:00:00.000Z",
          sex: fp.gender ?? null,
          address: addressLine,
          city,
          state,
          zipCode: postalCode,
          phone,
          organizationId: p.organizationId,
          insurances: {
            create: [
              {
                insuranceName: DEFAULT_INSURER_NAME,
                insurancePhone: DEFAULT_INSURER_PHONE,
              },
            ],
          },
        },
      });

      await tx.encounter.upsert({
        where: { id: encounterId },
        update: {
          patientId: patientId,
          physicianId: physicianId,
          facilityId: facilityId,
          status: "Pending Verification",
          priority: "NOT_APPLICABLE",
          encounterType: "ELIGIBILITY_AND_BENEFITS",
        },
        create: {
          id: encounterId,
          patientId: patientId,
          physicianId: physicianId,
          facilityId: facilityId,
          dateOfServiceStart: new Date().toISOString(),
          status: "Pending Verification",
          priority: "NOT_APPLICABLE",
          encounterType: "ELIGIBILITY_AND_BENEFITS",
        },
      });
    }
  });

  // 4) Additionally, pull a few Encounter resources and create demo "claim status" encounters
  const encRes = await fetch(`${trimSlash(p.fhirBaseUrl)}/Encounter?_count=5`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      ...(xApiKey ? { "x-api-key": xApiKey } : {}),
    },
  });
  if (encRes.ok) {
    type FhirEncounter = {
      resourceType: "Encounter";
      id?: string;
      subject?: { reference?: string };
      period?: { start?: string };
      class?: { code?: string };
      type?: Array<{ text?: string }>;
    };
    const encBundle = (await encRes.json()) as FhirBundle;
    const fhirEncounters = (encBundle.entry ?? [])
      .map((e) => e.resource)
      .filter((resource): resource is FhirEncounter => {
        if (typeof resource !== "object" || resource === null) return false;
        const candidate = resource as { resourceType?: unknown };
        return candidate.resourceType === "Encounter";
      });

    await prisma.$transaction(async (tx) => {
      for (const fe of fhirEncounters) {
        const eId = fe.id ?? cryptoRandomId();
        const claimEncounterId = `sandbox-claim-encounter-${eId}`;

        // Extract patient reference (e.g., "Patient/291862")
        const subj = fe.subject?.reference ?? "";
        const fhirPatientId = subj.startsWith("Patient/")
          ? subj.split("/")[1] ?? ""
          : "";
        const patientId = fhirPatientId
          ? `sandbox-patient-${fhirPatientId}`
          : undefined;

        // Ensure a patient exists; if not, skip this Encounter
        if (!patientId) continue;
        const patientExists = await tx.patient.findUnique({
          where: { id: patientId },
          select: { id: true },
        });
        if (!patientExists) continue;

        const dos =
          fe.period?.start ??
          new Date(Date.now() - 24 * 3600 * 1000).toISOString();

        await tx.encounter.upsert({
          where: { id: claimEncounterId },
          update: {
            patientId,
            physicianId,
            facilityId,
            dateOfServiceStart: dos,
            status: "Pending Claim Status Inquiry",
            priority: "NOT_APPLICABLE",
            encounterType: "CLAIM_STATUS_INQUIRIES",
            claimNumber: `CS-${eId}`,
            amountToBePaid: "100.00",
          },
          create: {
            id: claimEncounterId,
            patientId,
            physicianId,
            facilityId,
            dateOfServiceStart: dos,
            status: "Pending Claim Status Inquiry",
            priority: "NOT_APPLICABLE",
            encounterType: "CLAIM_STATUS_INQUIRIES",
            claimNumber: `CS-${eId}`,
            amountToBePaid: "100.00",
          },
        });

        // Also ensure the patient has a primary insurance with phone/name
        await tx.insurance.upsert({
          where: { id: `${patientId}-primary` },
          update: {
            insuranceName: DEFAULT_INSURER_NAME,
            insurancePhone: DEFAULT_INSURER_PHONE,
          },
          create: {
            id: `${patientId}-primary`,
            patientId,
            insuranceName: DEFAULT_INSURER_NAME,
            insurancePhone: DEFAULT_INSURER_PHONE,
          },
        });
      }
    });
  }

  // update syncCursor after finishing sync
  await prisma.syncCursor.update({
    where: { id: cursor.id },
    data: {
      since: new Date(),
      lastRunAt: new Date(),
      status: "OK",
      lastError: null
    }
  });

  return { ok: true as const, status: 200 as const };
}

function cryptoRandomId(): string {
  // Simple fallback id when FHIR id is missing
  return `sbx_${Math.random().toString(36).slice(2, 12)}`;
}
