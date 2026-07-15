import {
  encryptPHI,
  decryptPatientPHI,
} from "../../utils/encryption/patient/patient-encryption";

describe("Patient Encryption Tests", () => {
  const mockPatient = {
    patientId: "PAT123456",
    firstName: "John",
    middleName: "Michael",
    lastName: "Walker",
    sex: "M",
    dob: "1985-03-15",
    address: "123 Main Street",
    city: "Phoenix",
    state: "AZ",
    zipCode: "85001",
    phone: "602-555-0123",
    serviceStart: "2024-01-15T10:00:00Z",
    serviceEnd: "2024-01-15T11:00:00Z",
  };

  describe("encryptPHI", () => {
    it("should encrypt all PHI fields", () => {
      const encrypted = encryptPHI(mockPatient);

      // Check that all sensitive fields are encrypted
      expect(encrypted.firstName).not.toBe(mockPatient.firstName);
      expect(encrypted.middleName).not.toBe(mockPatient.middleName);
      expect(encrypted.lastName).not.toBe(mockPatient.lastName);
      expect(encrypted.patientId).not.toBe(mockPatient.patientId);
      expect(encrypted.sex).not.toBe(mockPatient.sex);
      expect(encrypted.dob).not.toBe(mockPatient.dob);
      expect(encrypted.address).not.toBe(mockPatient.address);
      expect(encrypted.city).not.toBe(mockPatient.city);
      expect(encrypted.state).not.toBe(mockPatient.state);
      expect(encrypted.zipCode).not.toBe(mockPatient.zipCode);
      expect(encrypted.phone).not.toBe(mockPatient.phone);

      // Check that IV and tag fields are present
      expect(encrypted.firstName_iv).toBeDefined();
      expect(encrypted.firstName_tag).toBeDefined();
      expect(encrypted.middleName_iv).toBeDefined();
      expect(encrypted.middleName_tag).toBeDefined();
      expect(encrypted.lastName_iv).toBeDefined();
      expect(encrypted.lastName_tag).toBeDefined();
      expect(encrypted.patientId_iv).toBeDefined();
      expect(encrypted.patientId_tag).toBeDefined();
      expect(encrypted.sex_iv).toBeDefined();
      expect(encrypted.sex_tag).toBeDefined();
      expect(encrypted.dob_iv).toBeDefined();
      expect(encrypted.dob_tag).toBeDefined();
      expect(encrypted.address_iv).toBeDefined();
      expect(encrypted.address_tag).toBeDefined();
      expect(encrypted.city_iv).toBeDefined();
      expect(encrypted.city_tag).toBeDefined();
      expect(encrypted.state_iv).toBeDefined();
      expect(encrypted.state_tag).toBeDefined();
      expect(encrypted.zipCode_iv).toBeDefined();
      expect(encrypted.zipCode_tag).toBeDefined();
      expect(encrypted.phone_iv).toBeDefined();
      expect(encrypted.phone_tag).toBeDefined();
    });

    it("should handle partial patient data", () => {
      const partialPatient = {
        firstName: "Jane",
        lastName: "Doe",
        phone: "555-123-4567",
      };

      const encrypted = encryptPHI(partialPatient);

      expect(encrypted.firstName).not.toBe(partialPatient.firstName);
      expect(encrypted.lastName).not.toBe(partialPatient.lastName);
      expect(encrypted.phone).not.toBe(partialPatient.phone);
      expect(encrypted.firstName_iv).toBeDefined();
      expect(encrypted.firstName_tag).toBeDefined();
      expect(encrypted.lastName_iv).toBeDefined();
      expect(encrypted.lastName_tag).toBeDefined();
      expect(encrypted.phone_iv).toBeDefined();
      expect(encrypted.phone_tag).toBeDefined();

      // Fields not provided should be undefined
      expect(encrypted.patientId).toBeUndefined();
      expect(encrypted.middleName).toBeUndefined();
      expect(encrypted.sex).toBeUndefined();
      expect(encrypted.dob).toBeUndefined();
    });

    it("should handle empty strings", () => {
      const patientWithEmptyFields = {
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
      };

      const encrypted = encryptPHI(patientWithEmptyFields);

      expect(encrypted.firstName).toBe("");
      expect(encrypted.lastName).toBe("");
      expect(encrypted.phone).toBe("");
      expect(encrypted.address).toBe("");
      expect(encrypted.firstName_iv).toBeUndefined();
      expect(encrypted.firstName_tag).toBeUndefined();
      expect(encrypted.lastName_iv).toBeUndefined();
      expect(encrypted.lastName_tag).toBeUndefined();
    });

    it("should handle null and undefined values", () => {
      const patientWithNulls = {
        firstName: "John",
        lastName: "Doe",
        phone: null,
        address: undefined,
      };

      const encrypted = encryptPHI(patientWithNulls);

      expect(encrypted.firstName).not.toBe(patientWithNulls.firstName);
      expect(encrypted.lastName).not.toBe(patientWithNulls.lastName);
      expect(encrypted.firstName_iv).toBeDefined();
      expect(encrypted.firstName_tag).toBeDefined();
      expect(encrypted.lastName_iv).toBeDefined();
      expect(encrypted.lastName_tag).toBeDefined();

      // Null/undefined fields should not be encrypted
      expect(encrypted.phone).toBeNull();
      expect(encrypted.address).toBeUndefined();
    });

    it("should handle special characters in patient data", () => {
      const patientWithSpecialChars = {
        firstName: "José",
        middleName: "María",
        lastName: "O'Connor-Smith",
        address: "123 Main St. #4B, Apt. 5",
        phone: "+1 (555) 123-4567 ext. 123",
      };

      const encrypted = encryptPHI(patientWithSpecialChars);

      expect(encrypted.firstName).not.toBe(patientWithSpecialChars.firstName);
      expect(encrypted.middleName).not.toBe(patientWithSpecialChars.middleName);
      expect(encrypted.lastName).not.toBe(patientWithSpecialChars.lastName);
      expect(encrypted.address).not.toBe(patientWithSpecialChars.address);
      expect(encrypted.phone).not.toBe(patientWithSpecialChars.phone);
    });
  });

  describe("decryptPatientPHI", () => {
    // Define clean function once at the top
    function clean(obj: any) {
      const out = { ...obj };
      Object.keys(out).forEach((k) => {
        if (/_iv$|_tag$/.test(k)) delete out[k];
      });
      return out;
    }

    it("should decrypt all PHI fields correctly", () => {
      const encrypted = encryptPHI(mockPatient);
      const decrypted = decryptPatientPHI(encrypted);
      expect(clean(decrypted)).toEqual(mockPatient);
    });

    it("should handle partial encrypted data", () => {
      const partialEncrypted = encryptPHI({
        firstName: "Jane",
        lastName: "Doe",
        phone: "555-123-4567",
      });

      const decrypted = decryptPatientPHI(partialEncrypted);

      expect(decrypted.firstName).toBe("Jane");
      expect(decrypted.lastName).toBe("Doe");
      expect(decrypted.phone).toBe("555-123-4567");
      expect(decrypted.patientId).toBeUndefined();
      expect(decrypted.middleName).toBeUndefined();
      expect(decrypted.sex).toBeUndefined();
    });

    it("should handle empty encrypted strings", () => {
      const emptyEncrypted = encryptPHI({
        firstName: "",
        lastName: "",
      });

      const decrypted = decryptPatientPHI(emptyEncrypted);

      expect(decrypted.firstName).toBe("");
      expect(decrypted.lastName).toBe("");
    });

    it("should handle null and undefined values", () => {
      const encrypted = encryptPHI({
        firstName: "John",
        lastName: "Doe",
        phone: null,
        address: undefined,
      });

      const decrypted = decryptPatientPHI(encrypted);

      expect(decrypted.firstName).toBe("John");
      expect(decrypted.lastName).toBe("Doe");
      expect(decrypted.phone).toBeNull();
      expect(decrypted.address).toBeUndefined();
    });

    it("should maintain data integrity across multiple cycles", () => {
      // First cycle
      const encrypted1 = encryptPHI(mockPatient);
      const decrypted1 = decryptPatientPHI(encrypted1);

      expect(clean(decrypted1)).toEqual(mockPatient);

      // Second cycle
      const encrypted2 = encryptPHI(decrypted1);
      const decrypted2 = decryptPatientPHI(encrypted2);

      // Third cycle
      const encrypted3 = encryptPHI(decrypted2);
      const decrypted3 = decryptPatientPHI(encrypted3);

      expect(clean(decrypted1)).toEqual(mockPatient);
      expect(clean(decrypted2)).toEqual(mockPatient);
      expect(clean(decrypted3)).toEqual(mockPatient);
    });

    it("should handle special characters correctly", () => {
      const specialPatient = {
        firstName: "José",
        middleName: "María",
        lastName: "O'Connor-Smith",
        address: "123 Main St. #4B, Apt. 5",
        phone: "+1 (555) 123-4567 ext. 123",
      };

      const encrypted = encryptPHI(specialPatient);
      const decrypted = decryptPatientPHI(encrypted);

      expect(decrypted.firstName).toBe(specialPatient.firstName);
      expect(decrypted.middleName).toBe(specialPatient.middleName);
      expect(decrypted.lastName).toBe(specialPatient.lastName);
      expect(decrypted.address).toBe(specialPatient.address);
      expect(decrypted.phone).toBe(specialPatient.phone);
    });
  });

  describe("Error Handling", () => {
    it("should handle missing IV or tag fields gracefully", () => {
      const encrypted = encryptPHI(mockPatient);

      // Remove IV and tag to simulate corrupted data
      delete encrypted.firstName_iv;
      delete encrypted.firstName_tag;

      const decrypted = decryptPatientPHI(encrypted);

      // Should still decrypt other fields correctly
      expect(decrypted.lastName).toBe(mockPatient.lastName);
      expect(decrypted.phone).toBe(mockPatient.phone);
      // firstName should remain as encrypted data when IV/tag are missing
      expect(decrypted.firstName).toBe(encrypted.firstName); // Should be the encrypted hex string
    });

    it("should handle partially missing encryption metadata", () => {
      const encrypted = encryptPHI(mockPatient);

      // Remove only IV to simulate partially corrupted data
      delete encrypted.lastName_iv;

      const decrypted = decryptPatientPHI(encrypted);

      // Should still decrypt other fields correctly
      expect(decrypted.firstName).toBe(mockPatient.firstName);
      expect(decrypted.phone).toBe(mockPatient.phone);
      // lastName should remain as encrypted data when IV is missing
      expect(decrypted.lastName).toBe(encrypted.lastName); // Should be the encrypted hex string
    });

    it("should handle corrupted encryption data", () => {
      const encrypted = encryptPHI(mockPatient);

      // Corrupt the encrypted data
      encrypted.firstName = "corrupted_data";

      // Should throw an error when trying to decrypt corrupted data
      expect(() => {
        decryptPatientPHI(encrypted);
      }).toThrow("Unsupported state or unable to authenticate data");
    });

    it("should handle missing tag field", () => {
      const encrypted = encryptPHI(mockPatient);

      // Remove only tag to simulate partially corrupted data
      delete encrypted.middleName_tag;

      const decrypted = decryptPatientPHI(encrypted);

      // Should still decrypt other fields correctly
      expect(decrypted.firstName).toBe(mockPatient.firstName);
      expect(decrypted.lastName).toBe(mockPatient.lastName);
      // middleName should remain as encrypted data when tag is missing
      expect(decrypted.middleName).toBe(encrypted.middleName); // Should be the encrypted hex string
    });

    it("should handle completely missing encryption metadata", () => {
      const encrypted = encryptPHI(mockPatient);

      // Remove all encryption metadata for one field
      delete encrypted.patientId_iv;
      delete encrypted.patientId_tag;

      const decrypted = decryptPatientPHI(encrypted);

      // Should still decrypt other fields correctly
      expect(decrypted.firstName).toBe(mockPatient.firstName);
      expect(decrypted.lastName).toBe(mockPatient.lastName);
      // patientId should remain as encrypted data
      expect(decrypted.patientId).toBe(encrypted.patientId); // Should be the encrypted hex string
    });
  });

  describe("Edge Cases", () => {
    it("should handle very long patient names", () => {
      const longName = "A".repeat(1000);
      const patient = {
        firstName: longName,
        lastName: "Smith",
      };

      const encrypted = encryptPHI(patient);
      const decrypted = decryptPatientPHI(encrypted);

      expect(decrypted.firstName).toBe(longName);
      expect(decrypted.lastName).toBe("Smith");
    });

    it("should handle unicode characters", () => {
      const unicodePatient = {
        firstName: "José",
        middleName: "你好",
        lastName: "Привет",
        address: "123 Main St. 🏠",
      };

      const encrypted = encryptPHI(unicodePatient);
      const decrypted = decryptPatientPHI(encrypted);

      expect(decrypted.firstName).toBe(unicodePatient.firstName);
      expect(decrypted.middleName).toBe(unicodePatient.middleName);
      expect(decrypted.lastName).toBe(unicodePatient.lastName);
      expect(decrypted.address).toBe(unicodePatient.address);
    });

    it("should handle date objects and strings", () => {
      const datePatient = {
        firstName: "John",
        lastName: "Doe",
        dob: new Date("1985-03-15").toString(),
        serviceStart: "2024-01-15T10:00:00Z",
      };

      const encrypted = encryptPHI(datePatient);
      const decrypted = decryptPatientPHI(encrypted);

      expect(decrypted.firstName).toBe(datePatient.firstName);
      expect(decrypted.lastName).toBe(datePatient.lastName);
      expect(decrypted.dob).toBe(datePatient.dob);
    });

    it("should handle patients with only required fields", () => {
      const minimalPatient = {
        firstName: "John",
        lastName: "Doe",
      };

      const encrypted = encryptPHI(minimalPatient);
      const decrypted = decryptPatientPHI(encrypted);

      expect(decrypted.firstName).toBe(minimalPatient.firstName);
      expect(decrypted.lastName).toBe(minimalPatient.lastName);
      expect(decrypted.middleName).toBeUndefined();
      expect(decrypted.patientId).toBeUndefined();
    });
  });
});
