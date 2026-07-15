type EhrVendor = "MODMED" | "AMAZING_CHARTS";

// These upserts should map FHIR resources into your domain models.
// For now, persist minimal link rows if IDs exist.
import { prisma } from "@/server/db";

async function ensurePractice(practiceId: string) {
  const p = await prisma.practice.findUnique({ where: { id: practiceId } });
  if (!p) throw new Error("practice missing");
  return p;
}

type FhirPatientResource = {
  id?: string;
  identifier?: Array<{ value?: string | null } | null> | null;
};

export async function upsertPatient(
  practiceId: string,
  vendor: EhrVendor,
  resource: FhirPatientResource | null | undefined,
): Promise<void> {
  const p = await ensurePractice(practiceId);
  const fhirId = resource?.id ?? undefined;
  if (!fhirId) return;

  const preferredId =
    resource?.identifier?.find((identifier) => identifier?.value)?.value ??
    `pt_${fhirId}`;

  // Find or create a Patient + link by fhir id. In real code, map demographics.
  const patient = await prisma.patient.upsert({
    where: { id: preferredId },
    create: {
      id: preferredId,
      patientId: "missing_patient_id",
    },
    update: {},
  });
  await prisma.ehrPatientLink.upsert({
    where: {
      practiceId_fhirPatientId: {
        practiceId: p.id,
        fhirPatientId: fhirId,
      },
    },
    create: {
      practiceId: p.id,
      vendor,
      patientId: patient.id,
      fhirPatientId: fhirId,
    },
    update: { lastSeenAt: new Date() },
  });
}

export async function upsertAppointment(
  practiceId: string,
  vendor: EhrVendor,
  resource: unknown,
): Promise<void> {
  await ensurePractice(practiceId);
  // Map as needed; skipped here.
}

export async function upsertEncounter(
  practiceId: string,
  vendor: EhrVendor,
  resource: unknown,
): Promise<void> {
  await ensurePractice(practiceId);
  // Map as needed; skipped here.
}
