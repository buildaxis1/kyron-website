import { parseISO, isValid } from "date-fns";
import { Insurance } from "@prisma/client";
import { decryptInsurancePHI } from "./encryption/insurance/insurance-encryption";

/**
 * Standardizes date input to ISO string or null
 */
export function standardizeDateInput(
  dateInput: string | undefined,
): string | null {
  if (!dateInput || dateInput.trim() === "") return null;

  try {
    const date = parseISO(dateInput);
    if (!isValid(date)) return null;
    return date.toISOString();
  } catch {
    return null;
  }
}

/**
 * Standardizes datetime input to ISO string or null
 */
export function standardizeDateTimeInput(
  dateTimeInput: string | undefined,
): string | null {
  if (!dateTimeInput || dateTimeInput.trim() === "") return null;

  try {
    const date = parseISO(dateTimeInput);
    if (!isValid(date)) return null;
    return date.toISOString();
  } catch {
    return null;
  }
}

/**
 * Validates and normalizes array or comma-separated string to clean array
 */
export function validateAndNormalizeArrayField(
  value: string[] | string | undefined,
): string[] {
  if (!value) return [];

  // Handle array input
  if (Array.isArray(value)) {
    return value
      .map((item) => item?.toString().trim())
      .filter((item) => item && item.length > 0)
      .filter((item, index, arr) => arr.indexOf(item) === index); // Remove duplicates
  }

  // Handle string input
  if (value.trim() === "") return [];

  return value
    .split(/,\s*/)
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
    .filter((item, index, arr) => arr.indexOf(item) === index); // Remove duplicates
}

/**
 * Normalizes insurance data by attempting decryption if needed
 */
export function normalizeInsuranceData(insurance: Insurance): Insurance {
  try {
    // Never attempt PHI decryption in the browser
    if (typeof window !== "undefined") {
      return insurance;
    }
    // Always try to decrypt first if encryption fields exist
    if (insurance.insuranceName_iv && insurance.insuranceName_tag) {
      return decryptInsurancePHI(insurance);
    }
    // Return as-is if no encryption fields
    return insurance;
  } catch (error) {
    console.error("Decryption failed, treating as plain text:", error);
    return insurance;
  }
}

/**
 * Validates that a string field is not empty
 */
export function validateNonEmptyString(
  value: string | undefined | null,
): string | null {
  if (!value || value.trim() === "") return null;
  return value.trim();
}

/**
 * Validates email format (basic validation)
 */
export function validateEmail(email: string | undefined | null): string | null {
  if (!email || email.trim() === "") return null;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const trimmedEmail = email.trim();

  return emailRegex.test(trimmedEmail) ? trimmedEmail : null;
}

/**
 * Validates phone number format (removes non-digits, validates length)
 */
export function validatePhone(phone: string | undefined | null): string | null {
  if (!phone || phone.trim() === "") return null;

  const digitsOnly = phone.replace(/\D/g, "");

  // Accept 10 or 11 digit phone numbers (US format)
  if (digitsOnly.length === 10 || digitsOnly.length === 11) {
    return digitsOnly;
  }

  return null;
}

/**
 * Validates zip code format (US zip codes: 5 or 9 digits)
 */
export function validateZipCode(
  zipCode: string | undefined | null,
): string | null {
  if (!zipCode || zipCode.trim() === "") return null;

  const digitsOnly = zipCode.replace(/\D/g, "");

  if (digitsOnly.length === 5 || digitsOnly.length === 9) {
    return digitsOnly.length === 9
      ? `${digitsOnly.slice(0, 5)}-${digitsOnly.slice(5)}`
      : digitsOnly;
  }

  return null;
}
