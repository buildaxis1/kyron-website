import { describe, it, expect } from "@jest/globals";
import { groupAndChunkEncountersByInsurer } from "../src/app/organization/dashboard/voice-ai/[slug]/utils/calls";
import type {
  Encounter,
  Patient,
  Insurance,
  Physician,
  OrganizationAction,
  File as BackendFile,
  Facility,
} from "@prisma/client";

// Minimal factory: only fields used by chunking (insurer phone/name), rest coerced for tests
function makeEncounter(
  id: string,
  insurancePhone: string | null,
  insuranceName: string | null,
): Encounter & {
  patient: Patient & { insurances: Insurance[] };
  physician: Physician | null;
  actions: (OrganizationAction & { files: BackendFile[] })[];
  facility: Facility | null;
} {
  const ins = [{ insurancePhone, insuranceName } as unknown as Insurance];
  const patient = { insurances: ins } as unknown as Patient & {
    insurances: Insurance[];
  };
  return {
    id,
    patient,
    physician: null,
    actions: [] as unknown as (OrganizationAction & { files: BackendFile[] })[],
    facility: null,
  } as unknown as Encounter & {
    patient: Patient & { insurances: Insurance[] };
    physician: Physician | null;
    actions: (OrganizationAction & { files: BackendFile[] })[];
    facility: Facility | null;
  };
}

describe("groupAndChunkEncountersByInsurer", () => {
  it("chunks k%3==0 groups into all 3s (e.g., 12 -> 3,3,3,3)", () => {
    const phone = "800-111-1111";
    const name = "Blue Cross";
    const encounters = Array.from({ length: 12 }, (_, i) =>
      makeEncounter(`e${i + 1}`, phone, name),
    );

    const { bulkChunks, singles, invalid } =
      groupAndChunkEncountersByInsurer(encounters);

    expect(invalid).toHaveLength(0);
    expect(singles).toHaveLength(0);
    expect(bulkChunks).toHaveLength(4);
    bulkChunks.forEach((c) => expect(c).toHaveLength(3));
    // homogeneity check
    bulkChunks.flat().forEach((e) => {
      const p = e.patient.insurances[0];
      expect(p?.insurancePhone).toBe(phone);
      expect(p?.insuranceName).toBe(name);
    });
  });

  it("chunks k%3==1 groups into one 4 and rest 3s (e.g., 10 -> 4,3,3)", () => {
    const phone = "800-222-2222";
    const name = "Aetna";
    const encounters = Array.from({ length: 10 }, (_, i) =>
      makeEncounter(`a${i + 1}`, phone, name),
    );

    const { bulkChunks, singles, invalid } =
      groupAndChunkEncountersByInsurer(encounters);

    expect(invalid).toHaveLength(0);
    expect(singles).toHaveLength(0);
    const sizes = bulkChunks.map((c) => c.length).sort((a, b) => b - a);
    expect(sizes).toEqual([4, 3, 3]);
  });

  it("chunks k%3==2 groups into one 5 and rest 3s (e.g., 11 -> 5,3,3)", () => {
    const phone = "800-333-3333";
    const name = "UnitedHealthcare";
    const encounters = Array.from({ length: 11 }, (_, i) =>
      makeEncounter(`u${i + 1}`, phone, name),
    );

    const { bulkChunks, singles, invalid } =
      groupAndChunkEncountersByInsurer(encounters);

    expect(invalid).toHaveLength(0);
    expect(singles).toHaveLength(0);
    const sizes = bulkChunks.map((c) => c.length).sort((a, b) => b - a);
    expect(sizes).toEqual([5, 3, 3]);
  });

  it("treats groups of size 1–2 as singles and mixes multiple insurers", () => {
    // A: 5 → single bulk [5]
    const aPhone = "800-444-4444";
    const aName = "Cigna";
    const a = Array.from({ length: 5 }, (_, i) =>
      makeEncounter(`c${i + 1}`, aPhone, aName),
    );

    // B: 2 → singles
    const bPhone = "800-555-5555";
    const bName = "Kaiser";
    const b = Array.from({ length: 2 }, (_, i) =>
      makeEncounter(`k${i + 1}`, bPhone, bName),
    );

    // One invalid (missing phone)
    const invalidOne = makeEncounter("inv1", null, "Aetna");

    const { bulkChunks, singles, invalid } = groupAndChunkEncountersByInsurer([
      ...a,
      ...b,
      invalidOne,
    ]);

    expect(invalid).toHaveLength(1);
    expect(bulkChunks).toHaveLength(1);
    expect(bulkChunks[0]).toHaveLength(5);
    expect(singles.map((e) => e.id).sort()).toEqual(["k1", "k2"]);
  });

  it("keeps chunks homogeneous by insurer phone and name", () => {
    // 6 total: 3 share phone/name X, 3 share Y → two chunks [3], [3]
    const x = [
      makeEncounter("x1", "888-000-0000", "BCBS"),
      makeEncounter("x2", "888-000-0000", "BCBS"),
      makeEncounter("x3", "888-000-0000", "BCBS"),
    ];
    const y = [
      makeEncounter("y1", "777-000-0000", "Aetna"),
      makeEncounter("y2", "777-000-0000", "Aetna"),
      makeEncounter("y3", "777-000-0000", "Aetna"),
    ];

    const { bulkChunks, singles, invalid } = groupAndChunkEncountersByInsurer([
      ...x,
      ...y,
    ]);

    expect(invalid).toHaveLength(0);
    expect(singles).toHaveLength(0);
    expect(bulkChunks).toHaveLength(2);
    const keys = bulkChunks.map((chunk) => {
      const p = chunk[0].patient.insurances[0];
      return `${p?.insurancePhone}::${p?.insuranceName}`;
    });
    expect(new Set(keys).size).toBe(2);
  });
});
