import { DecryptedEncounter } from "trpc/types/decrypted-types";
import { encrypt, decrypt } from "../secure";

// Encrypt all PHI/sensitive fields for Encounter
export function encryptEncounterPHI(encounter: {
  appointmentType?: string;
  appointmentTypeCode?: string;
  patientClass?: string;
  dateOfServiceStart?: string;
  dateOfServiceEnd?: string | null;
  productGroupId?: string | null;
  productId?: string | null;
  cptCodes?: string[];
  cptDescriptions?: string[];
  icdCodes?: string[];
  icdDescriptions?: string[];
  placesOfService?: string[];
  serviceTypes?: string[];
  modifiers?: string[];
  bodyParts?: string[];
  testNames?: string[];
  testCodes?: string[];
  customFields?: string[];
  claimNumber?: string;
  amountToBePaid?: string;
}) {
  const encrypted: any = { ...encounter };
  // Single string fields encryption
  const singleFields = [
    ["appointmentType", "appointmentType_iv", "appointmentType_tag"],
    [
      "appointmentTypeCode",
      "appointmentTypeCode_iv",
      "appointmentTypeCode_tag",
    ],
    ["patientClass", "patientClass_iv", "patientClass_tag"],
    ["dateOfServiceStart", "dateOfServiceStart_iv", "dateOfServiceStart_tag"],
    ["dateOfServiceEnd", "dateOfServiceEnd_iv", "dateOfServiceEnd_tag"],
    ["productGroupId", "productGroupId_iv", "productGroupId_tag"],
    ["productId", "productId_iv", "productId_tag"],
    ["claimNumber", "claimNumber_iv", "claimNumber_tag"],
    ["amountToBePaid", "amountToBePaid_iv", "amountToBePaid_tag"],
  ];
  for (const [field, ivField, tagField] of singleFields) {
    const value = (encounter as Record<string, any>)[field];
    if (value) {
      const { data, iv, tag } = encrypt(value);
      (encrypted as Record<string, any>)[field] = data;
      (encrypted as Record<string, any>)[ivField] = iv;
      (encrypted as Record<string, any>)[tagField] = tag;
    }
  }
  // Array fields encryption
  const arrayFields = [
    "cptCodes",
    "cptDescriptions",
    "icdCodes",
    "icdDescriptions",
    "placesOfService",
    "serviceTypes",
    "modifiers",
    "bodyParts",
    "testNames",
    "testCodes",
    "customFields",
  ];
  for (const field of arrayFields) {
    const value = (encounter as Record<string, any>)[field];
    if (Array.isArray(value)) {
      (encrypted as Record<string, any>)[field] = [];
      (encrypted as Record<string, any>)[`${field}_iv`] = [];
      (encrypted as Record<string, any>)[`${field}_tag`] = [];
      for (const item of value) {
        const { data, iv, tag } = encrypt(item);
        (encrypted as Record<string, any>)[field].push(data);
        (encrypted as Record<string, any>)[`${field}_iv`].push(iv);
        (encrypted as Record<string, any>)[`${field}_tag`].push(tag);
      }
    }
  }
  return encrypted;
}

// Decrypt all PHI/sensitive fields for Encounter
export function decryptEncounterPHI(encounter: {
  appointmentType?: string;
  appointmentType_iv?: string | null;
  appointmentType_tag?: string | null;
  appointmentTypeCode?: string;
  appointmentTypeCode_iv?: string | null;
  appointmentTypeCode_tag?: string | null;
  patientClass?: string;
  patientClass_iv?: string | null;
  patientClass_tag?: string | null;
  dateOfServiceStart?: string;
  dateOfServiceStart_iv?: string | null;
  dateOfServiceStart_tag?: string | null;
  dateOfServiceEnd?: string | null;
  dateOfServiceEnd_iv?: string | null;
  dateOfServiceEnd_tag?: string | null;
  productGroupId?: string | null;
  productGroupId_iv?: string | null;
  productGroupId_tag?: string | null;
  productId?: string | null;
  productId_iv?: string | null;
  productId_tag?: string | null;
  cptCodes?: string[];
  cptCodes_iv?: string[];
  cptCodes_tag?: string[];
  cptDescriptions?: string[];
  cptDescriptions_iv?: string[];
  cptDescriptions_tag?: string[];
  icdCodes?: string[];
  icdCodes_iv?: string[];
  icdCodes_tag?: string[];
  icdDescriptions?: string[];
  icdDescriptions_iv?: string[];
  icdDescriptions_tag?: string[];
  placesOfService?: string[];
  placesOfService_iv?: string[];
  placesOfService_tag?: string[];
  serviceTypes?: string[];
  modifiers?: string[];
  bodyParts?: string[];
  bodyParts_iv?: string[];
  bodyParts_tag?: string[];
  testNames?: string[];
  testNames_iv?: string[];
  testNames_tag?: string[];
  testCodes?: string[];
  testCodes_iv?: string[];
  testCodes_tag?: string[];
  customFields?: string[];
  customFields_iv?: string[];
  customFields_tag?: string[];
  [key: string]: any;
}): DecryptedEncounter {
  const decrypted: any = { ...encounter };
  // Single string fields decryption
  const singleFields = [
    ["appointmentType", "appointmentType_iv", "appointmentType_tag"],
    [
      "appointmentTypeCode",
      "appointmentTypeCode_iv",
      "appointmentTypeCode_tag",
    ],
    ["patientClass", "patientClass_iv", "patientClass_tag"],
    ["dateOfServiceStart", "dateOfServiceStart_iv", "dateOfServiceStart_tag"],
    ["dateOfServiceEnd", "dateOfServiceEnd_iv", "dateOfServiceEnd_tag"],
    ["productGroupId", "productGroupId_iv", "productGroupId_tag"],
    ["productId", "productId_iv", "productId_tag"],
    ["claimNumber", "claimNumber_iv", "claimNumber_tag"],
    ["amountToBePaid", "amountToBePaid_iv", "amountToBePaid_tag"],
  ];
  for (const [field, ivField, tagField] of singleFields) {
    if (encounter[field] && encounter[ivField] && encounter[tagField]) {
      decrypted[field] = decrypt({
        data: encounter[field],
        iv: encounter[ivField],
        tag: encounter[tagField],
      });
    }
  }
  // Array fields decryption
  const arrayFields = [
    "cptCodes",
    "cptDescriptions",
    "icdCodes",
    "icdDescriptions",
    "placesOfService",
    "serviceTypes",
    "modifiers",
    "bodyParts",
    "testNames",
    "testCodes",
    "customFields",
  ];
  for (const field of arrayFields) {
    if (
      Array.isArray(encounter[field]) &&
      Array.isArray(encounter[`${field}_iv`]) &&
      Array.isArray(encounter[`${field}_tag`]) &&
      encounter[field].length === encounter[`${field}_iv`].length &&
      encounter[field].length === encounter[`${field}_tag`].length
    ) {
      decrypted[field] = encounter[field].map((data: string, idx: number) =>
        decrypt({
          data,
          iv: encounter[`${field}_iv`][idx],
          tag: encounter[`${field}_tag`][idx],
        }),
      );
    } else {
      // If arrays are missing or have mismatched lengths, set to undefined
      decrypted[field] = undefined;
    }
  }
  return decrypted;
}
