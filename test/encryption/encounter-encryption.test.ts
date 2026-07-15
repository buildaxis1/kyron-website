import {
  encryptEncounterPHI,
  decryptEncounterPHI,
} from "../../utils/encryption/encounter/encounter-encryption";

describe("Encounter Encryption Tests", () => {
  // Helper function to remove encryption metadata
  function clean(obj: any) {
    const out = { ...obj };
    Object.keys(out).forEach((k) => {
      if (/_iv$|_tag$/.test(k)) delete out[k];
    });
    return out;
  }

  const mockEncounter = {
    appointmentType: "New Patient",
    appointmentTypeCode: "New Pt",
    patientClass: "E - Emergency",
    dateOfServiceStart: "2024-01-15T10:00:00Z",
    dateOfServiceEnd: "2024-01-15T11:00:00Z",
    productGroupId: "1",
    productId: "2",
    cptCodes: ["74177", "74178", "74160"],
    cptDescriptions: [
      "CT Abd & Pelvis W/ Contrast",
      "MRI of Brain",
      "MRI of Brain",
    ],
    icdCodes: ["R19.11", "E11.9"],
    icdDescriptions: ["Desc1", "Desc2"],
    placesOfService: ["Ambulatory Surgical Center", "Office", "Hospital"],
    serviceTypes: ["62", "63", "64"],
    modifiers: ["LT", "RT", "50"],
    bodyParts: ["Knee", "Shoulder", "Chest"],
    testNames: ["Test1", "Test2", "Test3"],
    testCodes: ["T1", "T2", "T3"],
    customFields: ["Custom1", "Custom2", "Custom3"],
  };

  describe("encryptEncounterPHI", () => {
    it("should encrypt all single fields", () => {
      const encrypted = encryptEncounterPHI(mockEncounter);

      // Check that single fields are encrypted
      expect(encrypted.appointmentType).not.toBe(mockEncounter.appointmentType);
      expect(encrypted.appointmentTypeCode).not.toBe(
        mockEncounter.appointmentTypeCode,
      );
      expect(encrypted.patientClass).not.toBe(mockEncounter.patientClass);
      expect(encrypted.dateOfServiceStart).not.toBe(
        mockEncounter.dateOfServiceStart,
      );
      expect(encrypted.dateOfServiceEnd).not.toBe(
        mockEncounter.dateOfServiceEnd,
      );
      expect(encrypted.productGroupId).not.toBe(mockEncounter.productGroupId);
      expect(encrypted.productId).not.toBe(mockEncounter.productId);

      // Check that IV and tag fields are present for single fields
      expect(encrypted.appointmentType_iv).toBeDefined();
      expect(encrypted.appointmentType_tag).toBeDefined();
      expect(encrypted.appointmentTypeCode_iv).toBeDefined();
      expect(encrypted.appointmentTypeCode_tag).toBeDefined();
      expect(encrypted.patientClass_iv).toBeDefined();
      expect(encrypted.patientClass_tag).toBeDefined();
      expect(encrypted.dateOfServiceStart_iv).toBeDefined();
      expect(encrypted.dateOfServiceStart_tag).toBeDefined();
      expect(encrypted.dateOfServiceEnd_iv).toBeDefined();
      expect(encrypted.dateOfServiceEnd_tag).toBeDefined();
      expect(encrypted.productGroupId_iv).toBeDefined();
      expect(encrypted.productGroupId_tag).toBeDefined();
      expect(encrypted.productId_iv).toBeDefined();
      expect(encrypted.productId_tag).toBeDefined();
    });

    it("should encrypt all array fields", () => {
      const encrypted = encryptEncounterPHI(mockEncounter);

      // Check that array fields are encrypted
      expect(encrypted.cptCodes).not.toEqual(mockEncounter.cptCodes);
      expect(encrypted.cptDescriptions).not.toEqual(
        mockEncounter.cptDescriptions,
      );
      expect(encrypted.icdCodes).not.toEqual(mockEncounter.icdCodes);
      expect(encrypted.icdDescriptions).not.toEqual(
        mockEncounter.icdDescriptions,
      );
      expect(encrypted.placesOfService).not.toEqual(
        mockEncounter.placesOfService,
      );
      expect(encrypted.serviceTypes).not.toEqual(mockEncounter.serviceTypes);
      expect(encrypted.modifiers).not.toEqual(mockEncounter.modifiers);
      expect(encrypted.bodyParts).not.toEqual(mockEncounter.bodyParts);
      expect(encrypted.testNames).not.toEqual(mockEncounter.testNames);
      expect(encrypted.testCodes).not.toEqual(mockEncounter.testCodes);
      expect(encrypted.customFields).not.toEqual(mockEncounter.customFields);

      // Check that IV and tag arrays are present for array fields
      expect(encrypted.cptCodes_iv).toBeDefined();
      expect(encrypted.cptCodes_tag).toBeDefined();
      expect(encrypted.cptDescriptions_iv).toBeDefined();
      expect(encrypted.cptDescriptions_tag).toBeDefined();
      expect(encrypted.icdCodes_iv).toBeDefined();
      expect(encrypted.icdCodes_tag).toBeDefined();
      expect(encrypted.icdDescriptions_iv).toBeDefined();
      expect(encrypted.icdDescriptions_tag).toBeDefined();
      expect(encrypted.placesOfService_iv).toBeDefined();
      expect(encrypted.placesOfService_tag).toBeDefined();
      expect(encrypted.serviceTypes_iv).toBeDefined();
      expect(encrypted.serviceTypes_tag).toBeDefined();
      expect(encrypted.modifiers_iv).toBeDefined();
      expect(encrypted.modifiers_tag).toBeDefined();
      expect(encrypted.bodyParts_iv).toBeDefined();
      expect(encrypted.bodyParts_tag).toBeDefined();
      expect(encrypted.testNames_iv).toBeDefined();
      expect(encrypted.testNames_tag).toBeDefined();
      expect(encrypted.testCodes_iv).toBeDefined();
      expect(encrypted.testCodes_tag).toBeDefined();
      expect(encrypted.customFields_iv).toBeDefined();
      expect(encrypted.customFields_tag).toBeDefined();

      // Check array lengths
      expect(encrypted.cptCodes.length).toBe(mockEncounter.cptCodes.length);
      expect(encrypted.cptCodes_iv.length).toBe(mockEncounter.cptCodes.length);
      expect(encrypted.cptCodes_tag.length).toBe(mockEncounter.cptCodes.length);
    });

    it("should handle partial encounter data", () => {
      const partialEncounter = {
        appointmentType: "Follow-up",
        cptCodes: ["99213"],
        icdCodes: ["Z00.00"],
      };

      const encrypted = encryptEncounterPHI(partialEncounter);

      expect(encrypted.appointmentType).not.toBe(
        partialEncounter.appointmentType,
      );
      expect(encrypted.cptCodes).not.toEqual(partialEncounter.cptCodes);
      expect(encrypted.icdCodes).not.toEqual(partialEncounter.icdCodes);

      // Fields not provided should be undefined
      expect(encrypted.appointmentTypeCode).toBeUndefined();
      expect(encrypted.patientClass).toBeUndefined();
      expect(encrypted.cptDescriptions).toBeUndefined();
    });

    it("should handle empty arrays", () => {
      const encounterWithEmptyArrays = {
        appointmentType: "New Patient",
        cptCodes: [],
        icdCodes: [],
        customFields: [],
      };

      const encrypted = encryptEncounterPHI(encounterWithEmptyArrays);

      expect(encrypted.appointmentType).not.toBe(
        encounterWithEmptyArrays.appointmentType,
      );
      expect(encrypted.cptCodes).toEqual([]);
      expect(encrypted.icdCodes).toEqual([]);
      expect(encrypted.customFields).toEqual([]);
      expect(encrypted.cptCodes_iv).toEqual([]);
      expect(encrypted.cptCodes_tag).toEqual([]);
    });

    it("should handle null and undefined values", () => {
      const encounterWithNulls = {
        appointmentType: "New Patient",
        dateOfServiceEnd: null,
        cptCodes: ["74177"],
        customFields: undefined,
      };

      const encrypted = encryptEncounterPHI(encounterWithNulls);

      expect(encrypted.appointmentType).not.toBe(
        encounterWithNulls.appointmentType,
      );
      expect(encrypted.cptCodes).not.toEqual(encounterWithNulls.cptCodes);
      expect(encrypted.dateOfServiceEnd).toBeNull();
      expect(encrypted.customFields).toBeUndefined();
    });

    it("should handle null values in arrays", () => {
      const nullValuesEncounter = {
        appointmentType: "New Patient",
        cptCodes: ["74177", null, "74160"] as any,
        customFields: [null, "Custom Field", null] as any,
      };

      // Should throw an error when trying to encrypt null values
      expect(() => {
        encryptEncounterPHI(nullValuesEncounter);
      }).toThrow(
        'The "data" argument must be of type string or an instance of Buffer, TypedArray, or DataView. Received null',
      );
    });

    it("should handle empty strings in arrays", () => {
      const emptyStringsEncounter = {
        appointmentType: "New Patient",
        cptCodes: ["74177", "", "74160"],
        customFields: ["", "Custom Field", ""],
      };

      const encrypted = encryptEncounterPHI(emptyStringsEncounter);
      const decrypted = decryptEncounterPHI(encrypted);

      expect(decrypted.cptCodes).toEqual(emptyStringsEncounter.cptCodes);
      expect(decrypted.customFields).toEqual(
        emptyStringsEncounter.customFields,
      );
    });
  });

  describe("decryptEncounterPHI", () => {
    it("should decrypt all fields correctly", () => {
      const encrypted = encryptEncounterPHI(mockEncounter);
      const decrypted = decryptEncounterPHI(encrypted);

      // Check single fields
      expect(decrypted.appointmentType).toBe(mockEncounter.appointmentType);
      expect(decrypted.appointmentTypeCode).toBe(
        mockEncounter.appointmentTypeCode,
      );
      expect(decrypted.patientClass).toBe(mockEncounter.patientClass);
      expect(decrypted.dateOfServiceStart).toBe(
        mockEncounter.dateOfServiceStart,
      );
      expect(decrypted.dateOfServiceEnd).toBe(mockEncounter.dateOfServiceEnd);
      expect(decrypted.productGroupId).toBe(mockEncounter.productGroupId);
      expect(decrypted.productId).toBe(mockEncounter.productId);

      // Check array fields
      expect(decrypted.cptCodes).toEqual(mockEncounter.cptCodes);
      expect(decrypted.cptDescriptions).toEqual(mockEncounter.cptDescriptions);
      expect(decrypted.icdCodes).toEqual(mockEncounter.icdCodes);
      expect(decrypted.icdDescriptions).toEqual(mockEncounter.icdDescriptions);
      expect(decrypted.placesOfService).toEqual(mockEncounter.placesOfService);
      expect(decrypted.serviceTypes).toEqual(mockEncounter.serviceTypes);
      expect(decrypted.modifiers).toEqual(mockEncounter.modifiers);
      expect(decrypted.bodyParts).toEqual(mockEncounter.bodyParts);
      expect(decrypted.testNames).toEqual(mockEncounter.testNames);
      expect(decrypted.testCodes).toEqual(mockEncounter.testCodes);
      expect(decrypted.customFields).toEqual(mockEncounter.customFields);
    });

    it("should handle partial encrypted data", () => {
      const partialEncrypted = encryptEncounterPHI({
        appointmentType: "Follow-up",
        cptCodes: ["99213"],
        icdCodes: ["Z00.00"],
      });

      const decrypted = decryptEncounterPHI(partialEncrypted);

      expect(decrypted.appointmentType).toBe("Follow-up");
      expect(decrypted.cptCodes).toEqual(["99213"]);
      expect(decrypted.icdCodes).toEqual(["Z00.00"]);
      expect(decrypted.appointmentTypeCode).toBeUndefined();
      expect(decrypted.patientClass).toBeUndefined();
    });

    it("should handle empty arrays", () => {
      const emptyArraysEncrypted = encryptEncounterPHI({
        appointmentType: "New Patient",
        cptCodes: [],
        icdCodes: [],
      });

      const decrypted = decryptEncounterPHI(emptyArraysEncrypted);

      expect(decrypted.appointmentType).toBe("New Patient");
      expect(decrypted.cptCodes).toEqual([]);
      expect(decrypted.icdCodes).toEqual([]);
    });

    it("should handle null and undefined values", () => {
      const encrypted = encryptEncounterPHI({
        appointmentType: "New Patient",
        dateOfServiceEnd: null,
        cptCodes: ["74177"],
        customFields: undefined,
      });

      const decrypted = decryptEncounterPHI(encrypted);

      expect(decrypted.appointmentType).toBe("New Patient");
      expect(decrypted.cptCodes).toEqual(["74177"]);
      expect(decrypted.dateOfServiceEnd).toBeNull();
      expect(decrypted.customFields).toBeUndefined();
    });

    it("should maintain data integrity across multiple cycles", () => {
      // First cycle
      const encrypted1 = encryptEncounterPHI(mockEncounter);
      const decrypted1 = decryptEncounterPHI(encrypted1);

      // Second cycle
      const encrypted2 = encryptEncounterPHI(decrypted1);
      const decrypted2 = decryptEncounterPHI(encrypted2);

      // Third cycle
      const encrypted3 = encryptEncounterPHI(decrypted2);
      const decrypted3 = decryptEncounterPHI(encrypted3);

      expect(clean(decrypted1)).toEqual(mockEncounter);
      expect(clean(decrypted2)).toEqual(mockEncounter);
      expect(clean(decrypted3)).toEqual(mockEncounter);
    });
  });

  describe("Error Handling", () => {
    it("should handle missing IV or tag fields gracefully", () => {
      const encrypted = encryptEncounterPHI(mockEncounter);

      // Remove IV and tag to simulate corrupted data
      delete encrypted.appointmentType_iv;
      delete encrypted.appointmentType_tag;

      const decrypted = decryptEncounterPHI(encrypted);

      // Should still decrypt other fields correctly
      expect(decrypted.patientClass).toBe(mockEncounter.patientClass);
      expect(decrypted.cptCodes).toEqual(mockEncounter.cptCodes);
      // appointmentType should remain as encrypted data when IV/tag are missing
      expect(decrypted.appointmentType).toBe(encrypted.appointmentType); // Should be the encrypted hex string
    });

    it("should handle partially missing encryption metadata", () => {
      const encrypted = encryptEncounterPHI(mockEncounter);

      // Remove only IV to simulate partially corrupted data
      delete encrypted.patientClass_iv;

      const decrypted = decryptEncounterPHI(encrypted);

      // Should still decrypt other fields correctly
      expect(decrypted.appointmentType).toBe(mockEncounter.appointmentType);
      expect(decrypted.cptCodes).toEqual(mockEncounter.cptCodes);
      // patientClass should remain as encrypted data when IV is missing
      expect(decrypted.patientClass).toBe(encrypted.patientClass); // Should be the encrypted hex string
    });

    it("should handle corrupted encryption data", () => {
      const encrypted = encryptEncounterPHI(mockEncounter);

      // Corrupt the encrypted data
      encrypted.appointmentType = "corrupted_data";

      // Should throw an error when trying to decrypt corrupted data
      expect(() => {
        decryptEncounterPHI(encrypted);
      }).toThrow("Unsupported state or unable to authenticate data");
    });

    it("should handle missing IV or tag arrays gracefully", () => {
      const encrypted = encryptEncounterPHI(mockEncounter);

      // Remove IV array to simulate corrupted data
      delete encrypted.cptCodes_iv;

      const decrypted = decryptEncounterPHI(encrypted);

      // Should still decrypt other fields correctly
      expect(decrypted.appointmentType).toBe(mockEncounter.appointmentType);
      expect(decrypted.cptCodes).toBeUndefined(); // Should be undefined due to missing IV array
    });

    it("should handle mismatched array lengths", () => {
      const encrypted = encryptEncounterPHI(mockEncounter);

      // Corrupt the data by making arrays different lengths
      encrypted.cptCodes_iv = encrypted.cptCodes_iv.slice(0, 1); // Remove some IVs

      const decrypted = decryptEncounterPHI(encrypted);

      // Should handle gracefully and decrypt what it can
      expect(decrypted.appointmentType).toBe(mockEncounter.appointmentType);
      expect(decrypted.cptCodes).toBeUndefined(); // Should be undefined due to mismatch
    });

    it("should handle missing tag arrays", () => {
      const encrypted = encryptEncounterPHI(mockEncounter);

      // Remove tag array to simulate corrupted data
      delete encrypted.icdCodes_tag;

      const decrypted = decryptEncounterPHI(encrypted);

      // Should still decrypt other fields correctly
      expect(decrypted.appointmentType).toBe(mockEncounter.appointmentType);
      expect(decrypted.cptCodes).toEqual(mockEncounter.cptCodes);
      expect(decrypted.icdCodes).toBeUndefined(); // Should be undefined due to missing tag array
    });

    it("should handle corrupted array elements", () => {
      const encrypted = encryptEncounterPHI(mockEncounter);

      // Corrupt one element in the array
      encrypted.cptCodes[0] = "corrupted_data";

      // Should throw an error when trying to decrypt corrupted data
      expect(() => {
        decryptEncounterPHI(encrypted);
      }).toThrow("Unsupported state or unable to authenticate data");
    });

    it("should handle non-array values in array fields", () => {
      const encrypted = encryptEncounterPHI(mockEncounter);

      // Replace array with non-array value
      encrypted.cptCodes = "not_an_array" as any;

      const decrypted = decryptEncounterPHI(encrypted);

      // Should handle gracefully
      expect(decrypted.appointmentType).toBe(mockEncounter.appointmentType);
      expect(decrypted.cptCodes).toBeUndefined(); // Should be undefined due to type mismatch
    });

    it("should handle missing tag field for single field", () => {
      const encrypted = encryptEncounterPHI(mockEncounter);

      // Remove only tag for a single field
      delete encrypted.dateOfServiceStart_tag;

      const decrypted = decryptEncounterPHI(encrypted);

      // Should still decrypt other fields correctly
      expect(decrypted.appointmentType).toBe(mockEncounter.appointmentType);
      expect(decrypted.cptCodes).toEqual(mockEncounter.cptCodes);
      // dateOfServiceStart should remain as encrypted data when tag is missing
      expect(decrypted.dateOfServiceStart).toBe(encrypted.dateOfServiceStart); // Should be the encrypted hex string
    });
  });

  describe("Array Field Edge Cases", () => {
    it("should handle arrays with different lengths", () => {
      const unevenEncounter = {
        appointmentType: "New Patient",
        cptCodes: ["74177", "74178"],
        cptDescriptions: ["CT Abd & Pelvis W/ Contrast"], // Different length
        icdCodes: ["R19.11", "E11.9", "Z00.00"], // Different length
        serviceTypes: ["62"], // Different length
      };

      const encrypted = encryptEncounterPHI(unevenEncounter);
      const decrypted = decryptEncounterPHI(encrypted);

      expect(decrypted.cptCodes).toEqual(unevenEncounter.cptCodes);
      expect(decrypted.cptDescriptions).toEqual(
        unevenEncounter.cptDescriptions,
      );
      expect(decrypted.icdCodes).toEqual(unevenEncounter.icdCodes);
      expect(decrypted.serviceTypes).toEqual(unevenEncounter.serviceTypes);
    });

    it("should handle arrays with special characters", () => {
      const specialEncounter = {
        appointmentType: "New Patient",
        cptDescriptions: ["CT Abd & Pelvis W/ Contrast", "MRI of Brain 🧠"],
        customFields: ["Custom Field 1", "Custom Field 2: Special!@#$%"],
      };

      const encrypted = encryptEncounterPHI(specialEncounter);
      const decrypted = decryptEncounterPHI(encrypted);

      expect(decrypted.cptDescriptions).toEqual(
        specialEncounter.cptDescriptions,
      );
      expect(decrypted.customFields).toEqual(specialEncounter.customFields);
    });

    it("should handle very long array elements", () => {
      const longElement = "A".repeat(1000);
      const longEncounter = {
        appointmentType: "New Patient",
        cptDescriptions: [longElement, "Short description"],
        customFields: [longElement, "Another long field: " + longElement],
      };

      const encrypted = encryptEncounterPHI(longEncounter);
      const decrypted = decryptEncounterPHI(encrypted);

      expect(decrypted.cptDescriptions).toEqual(longEncounter.cptDescriptions);
      expect(decrypted.customFields).toEqual(longEncounter.customFields);
    });

    it("should handle unicode characters in arrays", () => {
      const unicodeEncounter = {
        appointmentType: "New Patient",
        cptDescriptions: ["CT Abd & Pelvis W/ Contrast", "你好 MRI of Brain"],
        customFields: [
          "Custom Field 1",
          "Привет Custom Field 2",
          "🏠 Home Visit",
        ],
      };

      const encrypted = encryptEncounterPHI(unicodeEncounter);
      const decrypted = decryptEncounterPHI(encrypted);

      expect(decrypted.cptDescriptions).toEqual(
        unicodeEncounter.cptDescriptions,
      );
      expect(decrypted.customFields).toEqual(unicodeEncounter.customFields);
    });

    it("should handle empty strings in arrays", () => {
      const emptyStringsEncounter = {
        appointmentType: "New Patient",
        cptCodes: ["74177", "", "74160"],
        customFields: ["", "Custom Field", ""],
      };

      const encrypted = encryptEncounterPHI(emptyStringsEncounter);
      const decrypted = decryptEncounterPHI(encrypted);

      expect(decrypted.cptCodes).toEqual(emptyStringsEncounter.cptCodes);
      expect(decrypted.customFields).toEqual(
        emptyStringsEncounter.customFields,
      );
    });
  });
});
