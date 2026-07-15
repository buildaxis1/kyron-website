import prisma from "@/lib/prisma";
import { getModMedSandboxToken, trimSlash } from "./modmed";
import { getSecretParam } from "./ssm";
import type {
  DashboardEncounter,
  DashboardInsurance,
} from "@/app/organization/dashboard/voice-ai/[slug]/types";

interface FhirHumanName {
  text?: string;
  family?: string;
  given?: string[];
}

interface FhirTelecom {
  system?: string;
  value?: string;
}

interface FhirAddress {
  line?: string[];
  city?: string;
  state?: string;
  postalCode?: string;
}

interface FhirPatientResource {
  resourceType: "Patient";
  id?: string;
  name?: FhirHumanName[];
  gender?: string;
  birthDate?: string;
  telecom?: FhirTelecom[];
  address?: FhirAddress[];
}

interface FhirBundleEntry {
  resource?: unknown;
}

interface FhirBundle {
  entry?: FhirBundleEntry[];
}

function ensureString(value: string | undefined, fallback: string): string {
  return value && value.trim().length > 0 ? value : fallback;
}

function toDashboardInsurance(): DashboardInsurance[] {
  return [
    {
      insuranceName: "Sandbox Insurance",
      insurancePhone: null,
    },
  ];
}

function buildSandboxEncounter(
  patient: FhirPatientResource,
  organizationId: string,
  practiceName: string,
  index: number,
): DashboardEncounter {
  const baseId = patient.id ?? `sandbox-${index + 1}`;
  const sanitizedId = baseId.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();

  const nameData = patient.name?.[0];
  const givenNames = nameData?.given ?? [];
  const firstName = ensureString(
    givenNames[0] ?? nameData?.text?.split(/\s+/)[0],
    "Sandbox",
  );
  const lastName = ensureString(
    nameData?.family ??
      givenNames.slice(1).join(" ") ??
      nameData?.text?.split(/\s+/).slice(-1)[0],
    "Patient",
  );

  const address = patient.address?.[0];
  const addressLine = address?.line?.join(" ") ?? "123 Demo Street";
  const city = ensureString(address?.city, "Demo City");
  const state = ensureString(address?.state, "CA");
  const postalCode = ensureString(address?.postalCode, "00000");
  const phone =
    patient.telecom?.find((item) => item.system === "phone")?.value ?? null;

  const encounterId = `sandbox-encounter-${sanitizedId}`;
  const physicianId = `sandbox-physician-${sanitizedId}`;
  const facilityId = `sandbox-facility-${sanitizedId}`;

  return {
    id: encounterId,
    encounterType: "ELIGIBILITY_AND_BENEFITS",
    status: "ModMed Sandbox Sample",
    priority: "NOT_APPLICABLE",
    dateOfServiceStart: new Date().toISOString(),
    claimNumber: null,
    amountToBePaid: null,
    patient: {
      id: `sandbox-patient-${sanitizedId}`,
      firstName,
      lastName,
      dob: patient.birthDate ?? null,
      insurances: toDashboardInsurance(),
    },
    physician: {
      id: physicianId,
      physicianName: `Sandbox Physician ${lastName}`,
    },
    facility: {
      id: facilityId,
      name: `${practiceName} Sandbox Clinic`,
    },
    actions: [],
    source: "sandbox",
  };
}

export async function fetchModMedSandboxEncountersForOrganization(
  organizationId: string,
  limit = 12,
): Promise<DashboardEncounter[]> {
  const practice = await prisma.practice.findFirst({
    where: {
      organizationId,
      vendor: "MODMED",
      isActive: true,
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      fhirBaseUrl: true,
      ssmUsernameParam: true,
      ssmPasswordParam: true,
      ssmClientIdParam: true,
      ssmClientSecretParam: true,
      ssmApiKeyParam: true,
    },
  });

  if (
    !practice?.fhirBaseUrl ||
    !practice?.ssmUsernameParam ||
    !practice?.ssmPasswordParam
  ) {
    return [];
  }

  try {
    const token = await getModMedSandboxToken({
      fhirBaseUrl: practice.fhirBaseUrl,
      ssmUsernameParam: practice.ssmUsernameParam,
      ssmPasswordParam: practice.ssmPasswordParam,
      ssmClientIdParam: practice.ssmClientIdParam ?? undefined,
      ssmClientSecretParam: practice.ssmClientSecretParam ?? undefined,
      ssmApiKeyParam: practice.ssmApiKeyParam ?? undefined,
    });

    const xApiKey = practice.ssmApiKeyParam
      ? await getSecretParam(practice.ssmApiKeyParam)
      : "";

    const response = await fetch(
      `${trimSlash(practice.fhirBaseUrl)}/Patient?_count=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          ...(xApiKey ? { "x-api-key": xApiKey } : {}),
        },
      },
    );

    if (!response.ok) {
      console.error("Failed to fetch ModMed sandbox patients", {
        status: response.status,
        statusText: response.statusText,
      });
      return [];
    }

    const bundle = (await response.json()) as FhirBundle;
    const patients = (bundle.entry ?? [])
      .map((entry) => entry.resource)
      .filter((resource): resource is FhirPatientResource =>
        Boolean(
          resource &&
            typeof resource === "object" &&
            (resource as { resourceType?: string }).resourceType === "Patient",
        ),
      );

    return patients.map((patient, index) =>
      buildSandboxEncounter(
        patient,
        organizationId,
        practice.name ?? "ModMed Sandbox",
        index,
      ),
    );
  } catch (error) {
    console.error("Error loading ModMed sandbox encounters:", error);
    return [];
  }
}
