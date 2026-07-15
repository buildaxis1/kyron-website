import { DecryptedInsurance } from "trpc/types/decrypted-types";
import { encrypt, decrypt } from "../secure";

// Encrypt all PHI fields for Insurance
export function encryptInsurancePHI(insurance: {
  insuranceName?: string | null;
  memberId?: string | null;
  insurancePhone?: string | null;
  mailingEmailAddress?: string | null;
  networkType?: string | null;
  insurancePlan?: string | null;
  payerCode?: string | null;
  groupName?: string | null;
  groupNumber?: string | null;
  employerName?: string | null;
}) {
  const encrypted: any = { ...insurance };
  if (insurance.insuranceName) {
    const { data, iv, tag } = encrypt(insurance.insuranceName);
    encrypted.insuranceName = data;
    encrypted.insuranceName_iv = iv;
    encrypted.insuranceName_tag = tag;
  }
  if (insurance.memberId) {
    const { data, iv, tag } = encrypt(insurance.memberId);
    encrypted.memberId = data;
    encrypted.memberId_iv = iv;
    encrypted.memberId_tag = tag;
  }
  if (insurance.insurancePhone) {
    const { data, iv, tag } = encrypt(insurance.insurancePhone);
    encrypted.insurancePhone = data;
    encrypted.insurancePhone_iv = iv;
    encrypted.insurancePhone_tag = tag;
  }
  if (insurance.mailingEmailAddress) {
    const { data, iv, tag } = encrypt(insurance.mailingEmailAddress);
    encrypted.mailingEmailAddress = data;
    encrypted.mailingEmailAddress_iv = iv;
    encrypted.mailingEmailAddress_tag = tag;
  }
  if (insurance.networkType) {
    const { data, iv, tag } = encrypt(insurance.networkType);
    encrypted.networkType = data;
    encrypted.networkType_iv = iv;
    encrypted.networkType_tag = tag;
  }
  if (insurance.insurancePlan) {
    const { data, iv, tag } = encrypt(insurance.insurancePlan);
    encrypted.insurancePlan = data;
    encrypted.insurancePlan_iv = iv;
    encrypted.insurancePlan_tag = tag;
  }
  if (insurance.payerCode) {
    const { data, iv, tag } = encrypt(insurance.payerCode);
    encrypted.payerCode = data;
    encrypted.payerCode_iv = iv;
    encrypted.payerCode_tag = tag;
  }
  if (insurance.groupName) {
    const { data, iv, tag } = encrypt(insurance.groupName);
    encrypted.groupName = data;
    encrypted.groupName_iv = iv;
    encrypted.groupName_tag = tag;
  }
  if (insurance.groupNumber) {
    const { data, iv, tag } = encrypt(insurance.groupNumber);
    encrypted.groupNumber = data;
    encrypted.groupNumber_iv = iv;
    encrypted.groupNumber_tag = tag;
  }
  if (insurance.employerName) {
    const { data, iv, tag } = encrypt(insurance.employerName);
    encrypted.employerName = data;
    encrypted.employerName_iv = iv;
    encrypted.employerName_tag = tag;
  }
  return encrypted;
}

// Decrypt all PHI fields for Insurance
export function decryptInsurancePHI(insurance: any): DecryptedInsurance {
  const decrypted: any = { ...insurance };

  // Helper to safely decrypt a field that should contain hex-encoded ciphertext.
  // If the data is not valid hex (odd length, invalid chars), we just return it
  // as-is so plain-text/sentinel values still work.
  const safeDecrypt = (data: string, iv: string, tag: string): string => {
    const isHexLike =
      data.length % 2 === 0 && /^[0-9a-fA-F]+$/.test(data ?? "");
    if (!isHexLike) {
      return data;
    }
    try {
      return decrypt({ data, iv, tag });
    } catch {
      // If decryption fails for any reason, fall back to the raw string rather
      // than throwing and breaking request handling.
      return data;
    }
  };

  if (
    insurance.insuranceName &&
    insurance.insuranceName_iv &&
    insurance.insuranceName_tag
  ) {
    decrypted.insuranceName = safeDecrypt(
      insurance.insuranceName,
      insurance.insuranceName_iv,
      insurance.insuranceName_tag,
    );
  }
  if (insurance.memberId && insurance.memberId_iv && insurance.memberId_tag) {
    decrypted.memberId = safeDecrypt(
      insurance.memberId,
      insurance.memberId_iv,
      insurance.memberId_tag,
    );
  }
  if (
    insurance.insurancePhone &&
    insurance.insurancePhone_iv &&
    insurance.insurancePhone_tag
  ) {
    decrypted.insurancePhone = safeDecrypt(
      insurance.insurancePhone,
      insurance.insurancePhone_iv,
      insurance.insurancePhone_tag,
    );
  }
  if (
    insurance.mailingEmailAddress &&
    insurance.mailingEmailAddress_iv &&
    insurance.mailingEmailAddress_tag
  ) {
    decrypted.mailingEmailAddress = safeDecrypt(
      insurance.mailingEmailAddress,
      insurance.mailingEmailAddress_iv,
      insurance.mailingEmailAddress_tag,
    );
  }
  if (
    insurance.networkType &&
    insurance.networkType_iv &&
    insurance.networkType_tag
  ) {
    decrypted.networkType = safeDecrypt(
      insurance.networkType,
      insurance.networkType_iv,
      insurance.networkType_tag,
    );
  }
  if (
    insurance.insurancePlan &&
    insurance.insurancePlan_iv &&
    insurance.insurancePlan_tag
  ) {
    decrypted.insurancePlan = safeDecrypt(
      insurance.insurancePlan,
      insurance.insurancePlan_iv,
      insurance.insurancePlan_tag,
    );
  }
  if (
    insurance.payerCode &&
    insurance.payerCode_iv &&
    insurance.payerCode_tag
  ) {
    decrypted.payerCode = safeDecrypt(
      insurance.payerCode,
      insurance.payerCode_iv,
      insurance.payerCode_tag,
    );
  }
  if (
    insurance.groupName &&
    insurance.groupName_iv &&
    insurance.groupName_tag
  ) {
    decrypted.groupName = safeDecrypt(
      insurance.groupName,
      insurance.groupName_iv,
      insurance.groupName_tag,
    );
  }
  if (
    insurance.groupNumber &&
    insurance.groupNumber_iv &&
    insurance.groupNumber_tag
  ) {
    decrypted.groupNumber = safeDecrypt(
      insurance.groupNumber,
      insurance.groupNumber_iv,
      insurance.groupNumber_tag,
    );
  }
  if (
    insurance.employerName &&
    insurance.employerName_iv &&
    insurance.employerName_tag
  ) {
    decrypted.employerName = safeDecrypt(
      insurance.employerName,
      insurance.employerName_iv,
      insurance.employerName_tag,
    );
  }
  return decrypted;
}
