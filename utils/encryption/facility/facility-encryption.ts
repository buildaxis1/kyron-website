import { DecryptedFacility } from "trpc/types/decrypted-types";
import { encrypt, decrypt } from "../secure";

// Encrypt all PHI/sensitive fields for Facility
export function encryptFacilityPHI(facility: {
  name?: string | null;
  facilityNPI?: string | null;
  facilityCode?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  facilityPhone?: string | null;
  facilityFax?: string | null;
}) {
  const encrypted: any = { ...facility };
  if (facility.name) {
    const { data, iv, tag } = encrypt(facility.name);
    encrypted.name = data;
    encrypted.name_iv = iv;
    encrypted.name_tag = tag;
  }
  if (facility.facilityNPI) {
    const { data, iv, tag } = encrypt(facility.facilityNPI);
    encrypted.facilityNPI = data;
    encrypted.facilityNPI_iv = iv;
    encrypted.facilityNPI_tag = tag;
  }
  if (facility.facilityCode) {
    const { data, iv, tag } = encrypt(facility.facilityCode);
    encrypted.facilityCode = data;
    encrypted.facilityCode_iv = iv;
    encrypted.facilityCode_tag = tag;
  }
  if (facility.address) {
    const { data, iv, tag } = encrypt(facility.address);
    encrypted.address = data;
    encrypted.address_iv = iv;
    encrypted.address_tag = tag;
  }
  if (facility.city) {
    const { data, iv, tag } = encrypt(facility.city);
    encrypted.city = data;
    encrypted.city_iv = iv;
    encrypted.city_tag = tag;
  }
  if (facility.state) {
    const { data, iv, tag } = encrypt(facility.state);
    encrypted.state = data;
    encrypted.state_iv = iv;
    encrypted.state_tag = tag;
  }
  if (facility.zipCode) {
    const { data, iv, tag } = encrypt(facility.zipCode);
    encrypted.zipCode = data;
    encrypted.zipCode_iv = iv;
    encrypted.zipCode_tag = tag;
  }
  if (facility.facilityPhone) {
    const { data, iv, tag } = encrypt(facility.facilityPhone);
    encrypted.facilityPhone = data;
    encrypted.facilityPhone_iv = iv;
    encrypted.facilityPhone_tag = tag;
  }
  if (facility.facilityFax) {
    const { data, iv, tag } = encrypt(facility.facilityFax);
    encrypted.facilityFax = data;
    encrypted.facilityFax_iv = iv;
    encrypted.facilityFax_tag = tag;
  }
  return encrypted;
}

// Decrypt all PHI/sensitive fields for Facility
export function decryptFacilityPHI(facility: any): DecryptedFacility {
  const decrypted: any = { ...facility };
  if (facility.name && facility.name_iv && facility.name_tag) {
    decrypted.name = decrypt({
      data: facility.name,
      iv: facility.name_iv,
      tag: facility.name_tag,
    });
  }
  if (
    facility.facilityNPI &&
    facility.facilityNPI_iv &&
    facility.facilityNPI_tag
  ) {
    decrypted.facilityNPI = decrypt({
      data: facility.facilityNPI,
      iv: facility.facilityNPI_iv,
      tag: facility.facilityNPI_tag,
    });
  }
  if (
    facility.facilityCode &&
    facility.facilityCode_iv &&
    facility.facilityCode_tag
  ) {
    decrypted.facilityCode = decrypt({
      data: facility.facilityCode,
      iv: facility.facilityCode_iv,
      tag: facility.facilityCode_tag,
    });
  }
  if (facility.address && facility.address_iv && facility.address_tag) {
    decrypted.address = decrypt({
      data: facility.address,
      iv: facility.address_iv,
      tag: facility.address_tag,
    });
  }
  if (facility.city && facility.city_iv && facility.city_tag) {
    decrypted.city = decrypt({
      data: facility.city,
      iv: facility.city_iv,
      tag: facility.city_tag,
    });
  }
  if (facility.state && facility.state_iv && facility.state_tag) {
    decrypted.state = decrypt({
      data: facility.state,
      iv: facility.state_iv,
      tag: facility.state_tag,
    });
  }
  if (facility.zipCode && facility.zipCode_iv && facility.zipCode_tag) {
    decrypted.zipCode = decrypt({
      data: facility.zipCode,
      iv: facility.zipCode_iv,
      tag: facility.zipCode_tag,
    });
  }
  if (
    facility.facilityPhone &&
    facility.facilityPhone_iv &&
    facility.facilityPhone_tag
  ) {
    decrypted.facilityPhone = decrypt({
      data: facility.facilityPhone,
      iv: facility.facilityPhone_iv,
      tag: facility.facilityPhone_tag,
    });
  }
  if (
    facility.facilityFax &&
    facility.facilityFax_iv &&
    facility.facilityFax_tag
  ) {
    decrypted.facilityFax = decrypt({
      data: facility.facilityFax,
      iv: facility.facilityFax_iv,
      tag: facility.facilityFax_tag,
    });
  }
  return decrypted;
}
