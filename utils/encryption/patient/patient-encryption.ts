import { DecryptedPatient } from "trpc/types/decrypted-types";
import { encrypt, decrypt } from "../secure";

// Helper to encrypt PHI fields before storing
export function encryptPHI(patient: {
  patientId?: string | null;
  firstName: string;
  firstName_iv?: string | null;
  firstName_tag?: string | null;
  middleName?: string | null;
  middleName_iv?: string | null;
  middleName_tag?: string | null;
  lastName: string;
  lastName_iv?: string | null;
  lastName_tag?: string | null;
  sex?: string | null;
  sex_iv?: string | null;
  sex_tag?: string | null;
  dob?: string | null;
  dob_iv?: string | null;
  dob_tag?: string | null;
  address?: string | null;
  address_iv?: string | null;
  address_tag?: string | null;
  city?: string | null;
  city_iv?: string | null;
  city_tag?: string | null;
  state?: string | null;
  state_iv?: string | null;
  state_tag?: string | null;
  zipCode?: string | null;
  zipCode_iv?: string | null;
  zipCode_tag?: string | null;
  phone?: string | null;
  phone_iv?: string | null;
  phone_tag?: string | null;
  serviceStart?: Date | string | null;
  serviceEnd?: Date | string | null;
}) {
  const encrypted: any = { ...patient };
  if (patient.firstName) {
    const { data, iv, tag } = encrypt(patient.firstName);
    encrypted.firstName = data;
    encrypted.firstName_iv = iv;
    encrypted.firstName_tag = tag;
  }
  if (patient.middleName) {
    const { data, iv, tag } = encrypt(patient.middleName);
    encrypted.middleName = data;
    encrypted.middleName_iv = iv;
    encrypted.middleName_tag = tag;
  }
  if (patient.lastName) {
    const { data, iv, tag } = encrypt(patient.lastName);
    encrypted.lastName = data;
    encrypted.lastName_iv = iv;
    encrypted.lastName_tag = tag;
  }
  if (patient.patientId) {
    const { data, iv, tag } = encrypt(patient.patientId);
    encrypted.patientId = data;
    encrypted.patientId_iv = iv;
    encrypted.patientId_tag = tag;
  }
  if (patient.sex) {
    const { data, iv, tag } = encrypt(patient.sex);
    encrypted.sex = data;
    encrypted.sex_iv = iv;
    encrypted.sex_tag = tag;
  }
  if (patient.dob) {
    const { data, iv, tag } = encrypt(patient.dob.toString());
    encrypted.dob = data;
    encrypted.dob_iv = iv;
    encrypted.dob_tag = tag;
  }
  if (patient.address) {
    const { data, iv, tag } = encrypt(patient.address);
    encrypted.address = data;
    encrypted.address_iv = iv;
    encrypted.address_tag = tag;
  }
  if (patient.city) {
    const { data, iv, tag } = encrypt(patient.city);
    encrypted.city = data;
    encrypted.city_iv = iv;
    encrypted.city_tag = tag;
  }
  if (patient.state) {
    const { data, iv, tag } = encrypt(patient.state);
    encrypted.state = data;
    encrypted.state_iv = iv;
    encrypted.state_tag = tag;
  }
  if (patient.zipCode) {
    const { data, iv, tag } = encrypt(patient.zipCode);
    encrypted.zipCode = data;
    encrypted.zipCode_iv = iv;
    encrypted.zipCode_tag = tag;
  }
  if (patient.phone) {
    const { data, iv, tag } = encrypt(patient.phone);
    encrypted.phone = data;
    encrypted.phone_iv = iv;
    encrypted.phone_tag = tag;
  }

  return encrypted;
}

// Helper to decrypt PHI fields after retrieval
export function decryptPatientPHI(patient: any): DecryptedPatient {
  const decrypted: any = { ...patient };
  if (patient.firstName && patient.firstName_iv && patient.firstName_tag) {
    decrypted.firstName = decrypt({
      data: patient.firstName,
      iv: patient.firstName_iv,
      tag: patient.firstName_tag,
    });
  }
  if (patient.middleName && patient.middleName_iv && patient.middleName_tag) {
    decrypted.middleName = decrypt({
      data: patient.middleName,
      iv: patient.middleName_iv,
      tag: patient.middleName_tag,
    });
  }
  if (patient.lastName && patient.lastName_iv && patient.lastName_tag) {
    decrypted.lastName = decrypt({
      data: patient.lastName,
      iv: patient.lastName_iv,
      tag: patient.lastName_tag,
    });
  }
  if (patient.patientId && patient.patientId_iv && patient.patientId_tag) {
    decrypted.patientId = decrypt({
      data: patient.patientId,
      iv: patient.patientId_iv,
      tag: patient.patientId_tag,
    });
  }
  if (patient.sex && patient.sex_iv && patient.sex_tag) {
    decrypted.sex = decrypt({
      data: patient.sex,
      iv: patient.sex_iv,
      tag: patient.sex_tag,
    });
  }
  if (patient.dob && patient.dob_iv && patient.dob_tag) {
    decrypted.dob = decrypt({
      data: patient.dob,
      iv: patient.dob_iv,
      tag: patient.dob_tag,
    });
  }
  if (patient.address && patient.address_iv && patient.address_tag) {
    decrypted.address = decrypt({
      data: patient.address,
      iv: patient.address_iv,
      tag: patient.address_tag,
    });
  }
  if (patient.city && patient.city_iv && patient.city_tag) {
    decrypted.city = decrypt({
      data: patient.city,
      iv: patient.city_iv,
      tag: patient.city_tag,
    });
  }
  if (patient.state && patient.state_iv && patient.state_tag) {
    decrypted.state = decrypt({
      data: patient.state,
      iv: patient.state_iv,
      tag: patient.state_tag,
    });
  }
  if (patient.zipCode && patient.zipCode_iv && patient.zipCode_tag) {
    decrypted.zipCode = decrypt({
      data: patient.zipCode,
      iv: patient.zipCode_iv,
      tag: patient.zipCode_tag,
    });
  }
  if (patient.phone && patient.phone_iv && patient.phone_tag) {
    decrypted.phone = decrypt({
      data: patient.phone,
      iv: patient.phone_iv,
      tag: patient.phone_tag,
    });
  }
  decrypted.mrnSystem = patient.mrnSystem ?? null;
  decrypted.mrnValue = patient.mrnValue ?? null;

  return decrypted;
}
