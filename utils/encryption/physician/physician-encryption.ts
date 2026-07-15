import { DecryptedPhysician } from "trpc/types/decrypted-types";
import { encrypt, decrypt } from "../secure";

// Encrypt all PHI/sensitive fields for Physician
export function encryptPhysicianPHI(physician: {
  physicianName?: string | null;
  physicianNPI?: string | null;
  physicianOPN?: string | null;
  physicianTIN?: string | null;
  physicianExternalId?: string | null;
  physicianAddress?: string | null;
  physicianCity?: string | null;
  physicianState?: string | null;
  physicianZip?: string | null;
  physicianPhone?: string | null;
  physicianFax?: string | null;
  physicianEmail?: string | null;
}) {
  const encrypted: any = { ...physician };
  if (physician.physicianName) {
    const { data, iv, tag } = encrypt(physician.physicianName);
    encrypted.physicianName = data;
    encrypted.physicianName_iv = iv;
    encrypted.physicianName_tag = tag;
  }
  if (physician.physicianNPI) {
    const { data, iv, tag } = encrypt(physician.physicianNPI);
    encrypted.physicianNPI = data;
    encrypted.physicianNPI_iv = iv;
    encrypted.physicianNPI_tag = tag;
  }
  if (physician.physicianOPN) {
    const { data, iv, tag } = encrypt(physician.physicianOPN);
    encrypted.physicianOPN = data;
    encrypted.physicianOPN_iv = iv;
    encrypted.physicianOPN_tag = tag;
  }
  if (physician.physicianTIN) {
    const { data, iv, tag } = encrypt(physician.physicianTIN);
    encrypted.physicianTIN = data;
    encrypted.physicianTIN_iv = iv;
    encrypted.physicianTIN_tag = tag;
  }
  if (physician.physicianExternalId) {
    const { data, iv, tag } = encrypt(physician.physicianExternalId);
    encrypted.physicianExternalId = data;
    encrypted.physicianExternalId_iv = iv;
    encrypted.physicianExternalId_tag = tag;
  }
  if (physician.physicianAddress) {
    const { data, iv, tag } = encrypt(physician.physicianAddress);
    encrypted.physicianAddress = data;
    encrypted.physicianAddress_iv = iv;
    encrypted.physicianAddress_tag = tag;
  }
  if (physician.physicianCity) {
    const { data, iv, tag } = encrypt(physician.physicianCity);
    encrypted.physicianCity = data;
    encrypted.physicianCity_iv = iv;
    encrypted.physicianCity_tag = tag;
  }
  if (physician.physicianState) {
    const { data, iv, tag } = encrypt(physician.physicianState);
    encrypted.physicianState = data;
    encrypted.physicianState_iv = iv;
    encrypted.physicianState_tag = tag;
  }
  if (physician.physicianZip) {
    const { data, iv, tag } = encrypt(physician.physicianZip);
    encrypted.physicianZip = data;
    encrypted.physicianZip_iv = iv;
    encrypted.physicianZip_tag = tag;
  }
  if (physician.physicianPhone) {
    const { data, iv, tag } = encrypt(physician.physicianPhone);
    encrypted.physicianPhone = data;
    encrypted.physicianPhone_iv = iv;
    encrypted.physicianPhone_tag = tag;
  }
  if (physician.physicianFax) {
    const { data, iv, tag } = encrypt(physician.physicianFax);
    encrypted.physicianFax = data;
    encrypted.physicianFax_iv = iv;
    encrypted.physicianFax_tag = tag;
  }
  if (physician.physicianEmail) {
    const { data, iv, tag } = encrypt(physician.physicianEmail);
    encrypted.physicianEmail = data;
    encrypted.physicianEmail_iv = iv;
    encrypted.physicianEmail_tag = tag;
  }
  return encrypted;
}

// Decrypt all PHI/sensitive fields for Physician
export function decryptPhysicianPHI(physician: any): DecryptedPhysician {
  const decrypted: any = { ...physician };

  // Helper mirroring the insurance decrypt: only attempt AES decrypt if the
  // field actually looks like hex; otherwise treat it as plain text.
  const safeDecrypt = (data: string, iv: string, tag: string): string => {
    const isHexLike =
      data.length % 2 === 0 && /^[0-9a-fA-F]+$/.test(data ?? "");
    if (!isHexLike) {
      return data;
    }
    try {
      return decrypt({ data, iv, tag });
    } catch {
      return data;
    }
  };

  if (
    physician.physicianName &&
    physician.physicianName_iv &&
    physician.physicianName_tag
  ) {
    decrypted.physicianName = safeDecrypt(
      physician.physicianName,
      physician.physicianName_iv,
      physician.physicianName_tag,
    );
  }
  if (
    physician.physicianNPI &&
    physician.physicianNPI_iv &&
    physician.physicianNPI_tag
  ) {
    decrypted.physicianNPI = safeDecrypt(
      physician.physicianNPI,
      physician.physicianNPI_iv,
      physician.physicianNPI_tag,
    );
  }
  if (
    physician.physicianOPN &&
    physician.physicianOPN_iv &&
    physician.physicianOPN_tag
  ) {
    decrypted.physicianOPN = safeDecrypt(
      physician.physicianOPN,
      physician.physicianOPN_iv,
      physician.physicianOPN_tag,
    );
  }
  if (
    physician.physicianTIN &&
    physician.physicianTIN_iv &&
    physician.physicianTIN_tag
  ) {
    decrypted.physicianTIN = safeDecrypt(
      physician.physicianTIN,
      physician.physicianTIN_iv,
      physician.physicianTIN_tag,
    );
  }
  if (
    physician.physicianExternalId &&
    physician.physicianExternalId_iv &&
    physician.physicianExternalId_tag
  ) {
    decrypted.physicianExternalId = safeDecrypt(
      physician.physicianExternalId,
      physician.physicianExternalId_iv,
      physician.physicianExternalId_tag,
    );
  }
  if (
    physician.physicianAddress &&
    physician.physicianAddress_iv &&
    physician.physicianAddress_tag
  ) {
    decrypted.physicianAddress = safeDecrypt(
      physician.physicianAddress,
      physician.physicianAddress_iv,
      physician.physicianAddress_tag,
    );
  }
  if (
    physician.physicianCity &&
    physician.physicianCity_iv &&
    physician.physicianCity_tag
  ) {
    decrypted.physicianCity = safeDecrypt(
      physician.physicianCity,
      physician.physicianCity_iv,
      physician.physicianCity_tag,
    );
  }
  if (
    physician.physicianState &&
    physician.physicianState_iv &&
    physician.physicianState_tag
  ) {
    decrypted.physicianState = safeDecrypt(
      physician.physicianState,
      physician.physicianState_iv,
      physician.physicianState_tag,
    );
  }
  if (
    physician.physicianZip &&
    physician.physicianZip_iv &&
    physician.physicianZip_tag
  ) {
    decrypted.physicianZip = safeDecrypt(
      physician.physicianZip,
      physician.physicianZip_iv,
      physician.physicianZip_tag,
    );
  }
  if (
    physician.physicianPhone &&
    physician.physicianPhone_iv &&
    physician.physicianPhone_tag
  ) {
    decrypted.physicianPhone = safeDecrypt(
      physician.physicianPhone,
      physician.physicianPhone_iv,
      physician.physicianPhone_tag,
    );
  }
  if (
    physician.physicianFax &&
    physician.physicianFax_iv &&
    physician.physicianFax_tag
  ) {
    decrypted.physicianFax = safeDecrypt(
      physician.physicianFax,
      physician.physicianFax_iv,
      physician.physicianFax_tag,
    );
  }
  if (
    physician.physicianEmail &&
    physician.physicianEmail_iv &&
    physician.physicianEmail_tag
  ) {
    decrypted.physicianEmail = safeDecrypt(
      physician.physicianEmail,
      physician.physicianEmail_iv,
      physician.physicianEmail_tag,
    );
  }
  return decrypted;
}
