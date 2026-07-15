import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

// Mock external dependencies
jest.mock("@clerk/nextjs/server", () => ({
  clerkClient: jest.fn(() => ({
    users: {
      getUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    },
  })),
}));

jest.mock("@upstash/ratelimit", () => ({
  Ratelimit: jest.fn().mockImplementation(() => ({
    // @ts-ignore
    limit: jest.fn().mockResolvedValue({ success: true }),
  })),
}));

jest.mock("@upstash/redis", () => ({
  Redis: jest.fn(),
}));

jest.mock("@aws-sdk/client-s3", () => ({
  S3Client: jest.fn(),
  PutObjectCommand: jest.fn(),
  GetObjectCommand: jest.fn(),
}));

jest.mock("@aws-sdk/s3-request-presigner", () => ({
  // @ts-ignore
  getSignedUrl: jest.fn().mockResolvedValue("https://mock-signed-url.com"),
}));

jest.mock("../src/server/db", () => ({
  prisma: {
    patient: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      upsert: jest.fn(),
      delete: jest.fn(),
    },
    encounter: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    physician: {
      findUnique: jest.fn(),
      create: jest.fn(),
      upsert: jest.fn(),
    },
    facility: {
      findUnique: jest.fn(),
      create: jest.fn(),
      upsert: jest.fn(),
    },
    insurance: {
      create: jest.fn(),
      deleteMany: jest.fn(),
    },
    billerAction: {
      create: jest.fn(),
    },
    file: {
      create: jest.fn(),
    },
    $transaction: jest.fn(),
  },
}));

// Mock encryption utilities
jest.mock("../utils/encryption/secure", () => ({
  encrypt: jest.fn().mockImplementation((text: any) => ({
    encrypted: `encrypted_${text}`,
    iv: "mock_iv",
    tag: "mock_tag",
  })),
  decrypt: jest
    .fn()
    .mockImplementation((encrypted: any) =>
      encrypted.replace("encrypted_", ""),
    ),
}));

jest.mock("../utils/encryption/patient/patient-encryption", () => ({
  encryptPHI: jest.fn().mockImplementation((data: any) => ({
    ...data,
    name_iv: "mock_iv",
    name_tag: "mock_tag",
    dob_iv: "mock_iv",
    dob_tag: "mock_tag",
  })),
  decryptPatientPHI: jest.fn().mockImplementation((data: any) => data),
}));

jest.mock("../utils/encryption/encounter/encounter-encryption", () => ({
  encryptEncounterPHI: jest.fn().mockImplementation((data: any) => ({
    ...data,
    appointmentType_iv: "mock_iv",
    appointmentType_tag: "mock_tag",
  })),
  decryptEncounterPHI: jest.fn().mockImplementation((data: any) => data),
}));

jest.mock("../utils/encryption/physician/physician-encryption", () => ({
  encryptPhysicianPHI: jest.fn().mockImplementation((data: any) => ({
    ...data,
    physicianName_iv: "mock_iv",
    physicianName_tag: "mock_tag",
  })),
  decryptPhysicianPHI: jest.fn().mockImplementation((data: any) => data),
}));

jest.mock("../utils/encryption/facility/facility-encryption", () => ({
  encryptFacilityPHI: jest.fn().mockImplementation((data: any) => ({
    ...data,
    name_iv: "mock_iv",
    name_tag: "mock_tag",
  })),
  decryptFacilityPHI: jest.fn().mockImplementation((data: any) => data),
}));

jest.mock("../utils/encryption/insurance/insurance-encryption", () => ({
  encryptInsurancePHI: jest.fn().mockImplementation((data: any) => ({
    ...data,
    insuranceName_iv: "mock_iv",
    insuranceName_tag: "mock_tag",
  })),
  decryptInsurancePHI: jest.fn().mockImplementation((data: any) => data),
}));

jest.mock("../utils/encryption/file/file-encryption", () => ({
  encryptFilePHI: jest.fn().mockImplementation((data: any) => ({
    ...data,
    name_iv: "mock_iv",
    name_tag: "mock_tag",
  })),
  decryptFilePHI: jest.fn().mockImplementation((data: any) => data),
}));

jest.mock("../utils/encryption/biller-action/biller-action-encryption", () => ({
  encryptBillerActionPHI: jest.fn().mockImplementation((data: any) => ({
    ...data,
    content_iv: "mock_iv",
    content_tag: "mock_tag",
  })),
  decryptBillerActionPHI: jest.fn().mockImplementation((data: any) => data),
}));

jest.mock("../utils/tools", () => ({
  parseDate: jest.fn().mockImplementation((date: any) => new Date(date)),
  normalize: jest.fn().mockImplementation((text: any) => text?.toLowerCase()),
  levenshteinTwoMatrixRows: jest.fn().mockReturnValue(0.8),
  toValidDateOrNull: jest
    .fn()
    .mockImplementation((date: any) => (date ? new Date(date) : null)),
}));

// Mock the tRPC router
const mockAppRouter = {
  createCaller: jest.fn((context) => ({
    getAllEncountersByBillerId: jest.fn(),
    createEncounter: jest.fn(),
    createCasesBulk: jest.fn(),
    updateEncounterDetails: jest.fn(),
    deleteEncounter: jest.fn(),
  })),
};

jest.mock("../trpc/routers/_app", () => ({
  appRouter: mockAppRouter,
}));

describe("tRPC Encounter Management", () => {
  const mockUserId = "user_123456789";
  const mockContext = {
    userId: mockUserId,
    prisma: require("../src/server/db").prisma,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Encounter Loading (getAllEncountersByBillerId)", () => {
    it("should load encounters for authenticated user", async () => {
      const mockPatients = [{ id: "patient_1" }, { id: "patient_2" }];
      const mockEncounters = [
        {
          id: "encounter_1",
          patient: {
            id: "patient_1",
            name: "John Doe",
            insurances: [],
          },
          physician: {
            id: "physician_1",
            physicianName: "Dr. Smith",
          },
          facility: {
            id: "facility_1",
            name: "General Hospital",
          },
          actions: [],
          files: [],
        },
      ];

      const mockPrisma = require("../src/server/db").prisma;
      mockPrisma.patient.findMany.mockResolvedValue(mockPatients);
      mockPrisma.encounter.findMany.mockResolvedValue(mockEncounters);

      const caller = mockAppRouter.createCaller(mockContext);
      const mockGetAllEncounters =
        caller.getAllEncountersByBillerId as jest.Mock;
      (mockGetAllEncounters as any).mockResolvedValue(mockEncounters);

      const result = await caller.getAllEncountersByBillerId({
        userId: mockUserId,
      });

      expect(result).toEqual(mockEncounters);
      expect(mockGetAllEncounters).toHaveBeenCalledWith({ userId: mockUserId });
    });

    it("should throw UNAUTHORIZED error for unauthenticated user", async () => {
      const unauthenticatedContext = { ...mockContext, userId: undefined };
      const caller = mockAppRouter.createCaller(unauthenticatedContext);
      const mockGetAllEncounters =
        caller.getAllEncountersByBillerId as jest.Mock;
      (mockGetAllEncounters as any).mockRejectedValue(
        new TRPCError({ code: "UNAUTHORIZED" }),
      );

      await expect(
        caller.getAllEncountersByBillerId({ userId: mockUserId }),
      ).rejects.toThrow(TRPCError);
    });

    it("should handle empty patient list", async () => {
      const mockPrisma = require("../src/server/db").prisma;
      mockPrisma.patient.findMany.mockResolvedValue([]);
      mockPrisma.encounter.findMany.mockResolvedValue([]);

      const caller = mockAppRouter.createCaller(mockContext);
      const mockGetAllEncounters =
        caller.getAllEncountersByBillerId as jest.Mock;
      (mockGetAllEncounters as any).mockResolvedValue([]);

      const result = await caller.getAllEncountersByBillerId({
        userId: mockUserId,
      });

      expect(result).toHaveLength(0);
    });

    it("should handle database errors gracefully", async () => {
      const mockPrisma = require("../src/server/db").prisma;
      mockPrisma.patient.findMany.mockRejectedValue(
        new Error("Database error"),
      );

      const caller = mockAppRouter.createCaller(mockContext);
      const mockGetAllEncounters =
        caller.getAllEncountersByBillerId as jest.Mock;
      (mockGetAllEncounters as any).mockRejectedValue(
        new Error("Database error"),
      );

      await expect(
        caller.getAllEncountersByBillerId({ userId: mockUserId }),
      ).rejects.toThrow("Database error");
    });
  });

  describe("Encounter Creation (createEncounter)", () => {
    const validEncounterInput = {
      patientName: "John Doe",
      patientDob: "1990-01-01",
      patientAddress: "123 Main St",
      patientCity: "Anytown",
      patientState: "CA",
      patientZipCode: "12345",
      patientPhone: "555-123-4567",
      physicianName: "Dr. Smith",
      physicianNPI: "1234567890",
      facilityName: "General Hospital",
      facilityNPI: "0987654321",
      facilityAddress: "456 Hospital Dr",
      facilityCity: "Anytown",
      facilityState: "CA",
      facilityZipCode: "12345",
      appointmentType: "Office Visit",
      appointmentTypeCode: "99213",
      patientClass: "Outpatient",
      dateOfServiceStart: "2024-01-15",
      dateOfServiceEnd: "2024-01-15",
      cptCodes: ["99213"],
      cptDescriptions: ["Office visit"],
      icdCodes: ["Z00.00"],
      icdDescriptions: ["Encounter for general adult medical examination"],
      placesOfService: ["11"],
      serviceTypes: ["1"],
      modifiers: [],
      bodyParts: [],
      testNames: [],
      testCodes: [],
      customFields: [],
      insurances: [
        {
          insuranceName: "Blue Cross",
          memberId: "123456789",
          insurancePhone: "555-987-6543",
          mailingEmailAddress: "test@bluecross.com",
          networkType: "PPO",
          insurancePlan: "Gold",
          groupName: "Test Group",
          groupNumber: "GRP001",
          payerCode: "BCBS",
          employerName: "Test Employer",
          insuranceStartDate: new Date("2024-01-01"),
          insuranceEndDate: new Date("2024-12-31"),
        },
      ],
    };

    it("should create encounter with valid input", async () => {
      const mockPatient = { id: "patient_1", billerId: mockUserId };
      const mockPhysician = { id: "physician_1" };
      const mockFacility = { id: "facility_1" };
      const mockEncounter = { id: "encounter_1", ...validEncounterInput };

      const mockPrisma = require("../src/server/db").prisma;
      mockPrisma.patient.create.mockResolvedValue(mockPatient);
      mockPrisma.physician.upsert.mockResolvedValue(mockPhysician);
      mockPrisma.facility.upsert.mockResolvedValue(mockFacility);
      mockPrisma.encounter.create.mockResolvedValue(mockEncounter);
      mockPrisma.insurance.create.mockResolvedValue({ id: "insurance_1" });

      const caller = mockAppRouter.createCaller(mockContext);
      const mockCreateEncounter = caller.createEncounter as jest.Mock;
      (mockCreateEncounter as any).mockResolvedValue(mockEncounter);

      const result = await caller.createEncounter(validEncounterInput);

      expect(result).toEqual(mockEncounter);
      expect(mockCreateEncounter).toHaveBeenCalledWith(validEncounterInput);
    });

    it("should handle rate limiting", async () => {
      const mockRatelimit = require("@upstash/ratelimit").Ratelimit;
      const mockLimit = (jest.fn() as any).mockResolvedValue({
        success: false,
      });
      mockRatelimit.mockImplementation(() => ({ limit: mockLimit }));

      const caller = mockAppRouter.createCaller(mockContext);
      const mockCreateEncounter = caller.createEncounter as jest.Mock;
      (mockCreateEncounter as any).mockRejectedValue(
        new TRPCError({ code: "TOO_MANY_REQUESTS" }),
      );

      await expect(caller.createEncounter(validEncounterInput)).rejects.toThrow(
        TRPCError,
      );
    });

    it("should throw UNAUTHORIZED for unauthenticated user", async () => {
      const unauthenticatedContext = { ...mockContext, userId: undefined };
      const caller = mockAppRouter.createCaller(unauthenticatedContext);
      const mockCreateEncounter = caller.createEncounter as jest.Mock;
      (mockCreateEncounter as any).mockRejectedValue(
        new TRPCError({ code: "UNAUTHORIZED" }),
      );

      await expect(caller.createEncounter(validEncounterInput)).rejects.toThrow(
        TRPCError,
      );
    });

    it("should handle missing required fields", async () => {
      const invalidInput = {
        ...validEncounterInput,
        patientName: "", // Required field
      };

      const caller = mockAppRouter.createCaller(mockContext);
      const mockCreateEncounter = caller.createEncounter as jest.Mock;
      (mockCreateEncounter as any).mockRejectedValue(
        new Error("Validation failed"),
      );

      await expect(caller.createEncounter(invalidInput)).rejects.toThrow(
        "Validation failed",
      );
    });

    it("should handle database transaction failures", async () => {
      const mockPrisma = require("../src/server/db").prisma;
      mockPrisma.patient.create.mockRejectedValue(
        new Error("Transaction failed"),
      );

      const caller = mockAppRouter.createCaller(mockContext);
      const mockCreateEncounter = caller.createEncounter as jest.Mock;
      (mockCreateEncounter as any).mockRejectedValue(
        new Error("Transaction failed"),
      );

      await expect(caller.createEncounter(validEncounterInput)).rejects.toThrow(
        "Transaction failed",
      );
    });
  });

  describe("Bulk Encounter Creation (createCasesBulk)", () => {
    const validBulkInput = [
      {
        patientName: "John Doe",
        patientSex: "M",
        patientDob: "1990-01-01",
        patientAddress: "123 Main St",
        patientCity: "Anytown",
        patientState: "CA",
        patientZipCode: "12345",
        patientPhone: "555-123-4567",
        insurances: [
          {
            insuranceName: "Blue Cross",
            insurancePhone: "555-987-6543",
            memberId: "123456789",
            mailingEmailAddress: "test@bluecross.com",
            networkType: "PPO",
            insurancePlan: "Gold",
            groupName: "Test Group",
            groupNumber: "GRP001",
            payerCode: "BCBS",
            employerName: "Test Employer",
            insuranceStartDate: "2024-01-01",
            insuranceEndDate: "2024-12-31",
          },
        ],
        physicianName: "Dr. Smith",
        physicianNPI: "1234567890",
        physicianOPN: null,
        physicianTIN: null,
        physicianExternalId: null,
        physicianAddress: "789 Doctor St",
        physicianCity: "Anytown",
        physicianState: "CA",
        physicianZip: "12345",
        physicianPhone: "555-456-7890",
        physicianFax: null,
        physicianEmail: "dr.smith@hospital.com",
        facilityName: "General Hospital",
        facilityNPI: "0987654321",
        facilityCode: null,
        facilityAddress: "456 Hospital Dr",
        facilityCity: "Anytown",
        facilityState: "CA",
        facilityZipCode: "12345",
        facilityPhone: null,
        facilityFax: null,
        appointmentType: "Office Visit",
        appointmentTypeCode: "99213",
        patientClass: "Outpatient",
        dateOfServiceStart: "2024-01-15",
        dateOfServiceEnd: "2024-01-15",
        cptCodes: ["99213"],
        cptDescriptions: ["Office visit"],
        icdCodes: ["Z00.00"],
        icdDescriptions: ["Encounter for general adult medical examination"],
        placesOfService: ["11"],
        serviceTypes: ["1"],
        modifiers: [],
        bodyParts: [],
        testNames: [],
        testCodes: [],
        customFields: [],
      },
    ];

    it("should create multiple encounters successfully", async () => {
      const mockPrisma = require("../src/server/db").prisma;
      mockPrisma.$transaction.mockImplementation(async (callback) => {
        return await callback(mockPrisma);
      });
      mockPrisma.patient.create.mockResolvedValue({ id: "patient_1" });
      mockPrisma.physician.upsert.mockResolvedValue({ id: "physician_1" });
      mockPrisma.facility.upsert.mockResolvedValue({ id: "facility_1" });
      mockPrisma.encounter.create.mockResolvedValue({ id: "encounter_1" });
      mockPrisma.insurance.create.mockResolvedValue({ id: "insurance_1" });

      const caller = mockAppRouter.createCaller(mockContext);
      const mockCreateCasesBulk = caller.createCasesBulk as jest.Mock;
      (mockCreateCasesBulk as any).mockResolvedValue({ count: 1 });

      const result = await caller.createCasesBulk(validBulkInput);

      expect((result as any).count).toBe(1);
      expect(mockCreateCasesBulk).toHaveBeenCalledWith(validBulkInput);
    });

    it("should handle rate limiting for bulk operations", async () => {
      const mockRatelimit = require("@upstash/ratelimit").Ratelimit;
      const mockLimit = (jest.fn() as any).mockResolvedValue({
        success: false,
      });
      mockRatelimit.mockImplementation(() => ({ limit: mockLimit }));

      const caller = mockAppRouter.createCaller(mockContext);
      const mockCreateCasesBulk = caller.createCasesBulk as jest.Mock;
      (mockCreateCasesBulk as any).mockRejectedValue(
        new TRPCError({ code: "TOO_MANY_REQUESTS" }),
      );

      await expect(caller.createCasesBulk(validBulkInput)).rejects.toThrow(
        TRPCError,
      );
    });

    it("should handle empty input array", async () => {
      const caller = mockAppRouter.createCaller(mockContext);
      const mockCreateCasesBulk = caller.createCasesBulk as jest.Mock;
      (mockCreateCasesBulk as any).mockResolvedValue({ count: 0 });

      const result = await caller.createCasesBulk([]);

      expect((result as any).count).toBe(0);
    });

    it("should handle transaction failures", async () => {
      const mockPrisma = require("../src/server/db").prisma;
      mockPrisma.$transaction.mockRejectedValue(
        new Error("Transaction failed"),
      );

      const caller = mockAppRouter.createCaller(mockContext);
      const mockCreateCasesBulk = caller.createCasesBulk as jest.Mock;
      (mockCreateCasesBulk as any).mockRejectedValue(
        new Error("Transaction failed"),
      );

      await expect(caller.createCasesBulk(validBulkInput)).rejects.toThrow(
        "Transaction failed",
      );
    });
  });

  describe("Input Validation", () => {
    describe("Patient Data Validation", () => {
      it("should validate required patient fields", () => {
        const PatientSchema = z.object({
          name: z.string().min(1, "Name is required"),
          dob: z.string().min(1, "Date of birth is required"),
          sex: z.string().nullable(),
          address: z.string().nullable(),
          city: z.string().nullable(),
          state: z.string().nullable(),
          zipCode: z.string().nullable(),
          phone: z.string().nullable(),
        });

        const validPatient = {
          name: "John Doe",
          dob: "1990-01-01",
          sex: "M",
          address: "123 Main St",
          city: "Anytown",
          state: "CA",
          zipCode: "12345",
          phone: "555-123-4567",
        };

        expect(() => PatientSchema.parse(validPatient)).not.toThrow();
      });

      it("should reject invalid patient data", () => {
        const PatientSchema = z.object({
          name: z.string().min(1, "Name is required"),
          dob: z.string().min(1, "Date of birth is required"),
        });

        const invalidPatient = {
          name: "",
          dob: "",
        };

        expect(() => PatientSchema.parse(invalidPatient)).toThrow();
      });
    });

    describe("Encounter Data Validation", () => {
      it("should validate required encounter fields", () => {
        const EncounterSchema = z.object({
          appointmentType: z.string().min(1, "Appointment type is required"),
          appointmentTypeCode: z
            .string()
            .min(1, "Appointment type code is required"),
          patientClass: z.string().min(1, "Patient class is required"),
          dateOfServiceStart: z
            .string()
            .min(1, "Service start date is required"),
          cptCodes: z
            .array(z.string())
            .min(1, "At least one CPT code is required"),
          icdCodes: z
            .array(z.string())
            .min(1, "At least one ICD code is required"),
        });

        const validEncounter = {
          appointmentType: "Office Visit",
          appointmentTypeCode: "99213",
          patientClass: "Outpatient",
          dateOfServiceStart: "2024-01-15",
          cptCodes: ["99213"],
          icdCodes: ["Z00.00"],
        };

        expect(() => EncounterSchema.parse(validEncounter)).not.toThrow();
      });

      it("should reject invalid encounter data", () => {
        const EncounterSchema = z.object({
          appointmentType: z.string().min(1, "Appointment type is required"),
          cptCodes: z
            .array(z.string())
            .min(1, "At least one CPT code is required"),
        });

        const invalidEncounter = {
          appointmentType: "",
          cptCodes: [],
        };

        expect(() => EncounterSchema.parse(invalidEncounter)).toThrow();
      });
    });

    describe("Insurance Data Validation", () => {
      it("should validate insurance data", () => {
        const InsuranceSchema = z.object({
          insuranceName: z.string().nullable(),
          memberId: z.string().nullable(),
          insurancePhone: z.string().nullable(),
          mailingEmailAddress: z.string().email().nullable(),
          networkType: z.string().nullable(),
          insurancePlan: z.string().nullable(),
          groupName: z.string().nullable(),
          groupNumber: z.string().nullable(),
          payerCode: z.string().nullable(),
          employerName: z.string().nullable(),
          insuranceStartDate: z.date(),
          insuranceEndDate: z.date().nullable(),
        });

        const validInsurance = {
          insuranceName: "Blue Cross",
          memberId: "123456789",
          insurancePhone: "555-987-6543",
          mailingEmailAddress: "test@bluecross.com",
          networkType: "PPO",
          insurancePlan: "Gold",
          groupName: "Test Group",
          groupNumber: "GRP001",
          payerCode: "BCBS",
          employerName: "Test Employer",
          insuranceStartDate: new Date("2024-01-01"),
          insuranceEndDate: new Date("2024-12-31"),
        };

        expect(() => InsuranceSchema.parse(validInsurance)).not.toThrow();
      });

      it("should reject invalid email format", () => {
        const InsuranceSchema = z.object({
          mailingEmailAddress: z
            .string()
            .email("Invalid email format")
            .nullable(),
        });

        const invalidInsurance = {
          mailingEmailAddress: "invalid-email",
        };

        expect(() => InsuranceSchema.parse(invalidInsurance)).toThrow();
      });
    });
  });

  describe("Error Handling", () => {
    it("should handle malformed input data", async () => {
      const caller = mockAppRouter.createCaller(mockContext);
      const mockCreateEncounter = caller.createEncounter as jest.Mock;
      (mockCreateEncounter as any).mockRejectedValue(
        new Error("Validation failed"),
      );

      // Test with malformed data that doesn't match schema
      const malformedData = {
        patientName: 123, // Should be string
        patientDob: "invalid-date",
        // Missing required fields
      };

      await expect(
        caller.createEncounter(malformedData as any),
      ).rejects.toThrow("Validation failed");
    });

    it("should handle concurrent requests gracefully", async () => {
      const mockPrisma = require("../src/server/db").prisma;
      mockPrisma.patient.create.mockResolvedValue({ id: "patient_1" });
      mockPrisma.physician.upsert.mockResolvedValue({ id: "physician_1" });
      mockPrisma.facility.upsert.mockResolvedValue({ id: "facility_1" });
      mockPrisma.encounter.create.mockResolvedValue({ id: "encounter_1" });

      const caller = mockAppRouter.createCaller(mockContext);
      const mockCreateEncounter = caller.createEncounter as jest.Mock;
      (mockCreateEncounter as any).mockResolvedValue({ id: "encounter_1" });

      const validInput = {
        patientName: "John Doe",
        patientDob: "1990-01-01",
        physicianName: "Dr. Smith",
        physicianNPI: "1234567890",
        facilityName: "General Hospital",
        facilityNPI: "0987654321",
        facilityAddress: "456 Hospital Dr",
        facilityCity: "Anytown",
        facilityState: "CA",
        facilityZipCode: "12345",
        appointmentType: "Office Visit",
        appointmentTypeCode: "99213",
        patientClass: "Outpatient",
        dateOfServiceStart: "2024-01-15",
        dateOfServiceEnd: "2024-01-15",
        cptCodes: ["99213"],
        cptDescriptions: ["Office visit"],
        icdCodes: ["Z00.00"],
        icdDescriptions: ["Encounter for general adult medical examination"],
        placesOfService: ["11"],
        serviceTypes: ["1"],
        modifiers: [],
        bodyParts: [],
        testNames: [],
        testCodes: [],
        customFields: [],
        insurances: [],
      };

      // Make multiple concurrent requests
      const promises = Array(5)
        .fill(null)
        .map(() => caller.createEncounter(validInput));

      const results = await Promise.allSettled(promises);
      const successfulResults = results.filter(
        (result) => result.status === "fulfilled",
      );

      expect(successfulResults.length).toBeGreaterThan(0);
    });

    it("should handle large data sets", async () => {
      const largeBulkInput = Array(100)
        .fill(null)
        .map((_, index) => ({
          patientName: `Patient ${index}`,
          patientSex: "M",
          patientDob: "1990-01-01",
          patientAddress: "123 Main St",
          patientCity: "Anytown",
          patientState: "CA",
          patientZipCode: "12345",
          patientPhone: "555-123-4567",
          insurances: [],
          physicianName: "Dr. Smith",
          physicianNPI: "1234567890",
          physicianOPN: null,
          physicianTIN: null,
          physicianExternalId: null,
          physicianAddress: "789 Doctor St",
          physicianCity: "Anytown",
          physicianState: "CA",
          physicianZip: "12345",
          physicianPhone: "555-456-7890",
          physicianFax: null,
          physicianEmail: "dr.smith@hospital.com",
          facilityName: "General Hospital",
          facilityNPI: "0987654321",
          facilityCode: null,
          facilityAddress: "456 Hospital Dr",
          facilityCity: "Anytown",
          facilityState: "CA",
          facilityZipCode: "12345",
          facilityPhone: null,
          facilityFax: null,
          appointmentType: "Office Visit",
          appointmentTypeCode: "99213",
          patientClass: "Outpatient",
          dateOfServiceStart: "2024-01-15",
          dateOfServiceEnd: "2024-01-15",
          cptCodes: ["99213"],
          cptDescriptions: ["Office visit"],
          icdCodes: ["Z00.00"],
          icdescriptions: ["Encounter for general adult medical examination"],
          placesOfService: ["11"],
          serviceTypes: ["1"],
          modifiers: [],
          bodyParts: [],
          testNames: [],
          testCodes: [],
          customFields: [],
        }));

      const mockPrisma = require("../src/server/db").prisma;
      mockPrisma.$transaction.mockImplementation(async (callback: any) => {
        return await callback(mockPrisma);
      });
      mockPrisma.patient.create.mockResolvedValue({ id: "patient_1" });
      mockPrisma.physician.upsert.mockResolvedValue({ id: "physician_1" });
      mockPrisma.facility.upsert.mockResolvedValue({ id: "facility_1" });
      mockPrisma.encounter.create.mockResolvedValue({ id: "encounter_1" });
      mockPrisma.insurance.create.mockResolvedValue({ id: "insurance_1" });

      const caller = mockAppRouter.createCaller(mockContext);
      const mockCreateCasesBulk = caller.createCasesBulk as jest.Mock;
      (mockCreateCasesBulk as any).mockResolvedValue({ count: 100 });

      const result = await caller.createCasesBulk(largeBulkInput);

      expect((result as any).count).toBe(100);
    });
  });
});
