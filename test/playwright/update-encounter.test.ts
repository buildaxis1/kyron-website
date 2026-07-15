// import { prisma } from "src/server/db";
// import {
//   validateNonEmptyString,
//   validateEmail,
//   validatePhone,
//   validateZipCode,
//   standardizeDateInput,
//   standardizeDateTimeInput,
//   validateAndNormalizeArrayField,
//   normalizeInsuranceData,
// } from "utils/data-helpers";
// import { test, expect, beforeAll, afterAll } from "@playwright/test";

// test.describe("Update Encounter Data Pipeline", () => {
//   let testUserId: string;

//   // Helper function to ensure database operations are committed
//   async function ensureCommitted() {
//     await new Promise((resolve) => setTimeout(resolve, 150));
//     await prisma.$queryRaw`SELECT 1`; // Force a database round-trip
//   }

//   // Helper function to retry entity queries with exponential backoff
//   async function retryQuery<T>(
//     queryFn: () => Promise<T | null>,
//     maxRetries = 3,
//     baseDelay = 100,
//   ): Promise<T | null> {
//     for (let attempt = 0; attempt < maxRetries; attempt++) {
//       const result = await queryFn();
//       if (result) return result;
      
//       if (attempt < maxRetries - 1) {
//         await new Promise((resolve) => setTimeout(resolve, baseDelay * Math.pow(2, attempt)));
//       }
//     }
//     return null;
//   }

//   beforeAll(async () => {
//     // Enhanced cleanup with dependency order and error handling
//     try {
//       const testIdentifiers = [
//         "test-user-update-encounter",
//         "John-",
//         "Test Dr. Smith-",
//         "Test Facility A-",
//         "Test Insurance Co",
//         Date.now().toString().slice(-8), // Recent timestamps
//       ];

//       // Delete in dependency order: encounters → insurances → patients → physicians → facilities
//       for (const identifier of testIdentifiers) {
//         try {
//           await prisma.encounter.deleteMany({
//             where: {
//               OR: [
//                 { patient: { firstName: { contains: identifier } } },
//                 { physician: { physicianName: { contains: identifier } } },
//                 { facility: { name: { contains: identifier } } },
//               ],
//             },
//           });

//           await prisma.insurance.deleteMany({
//             where: {
//               OR: [
//                 { insuranceName: { contains: identifier } },
//                 { patient: { firstName: { contains: identifier } } },
//               ],
//             },
//           });

//           await prisma.patient.deleteMany({
//             where: {
//               firstName: { contains: identifier },
//             },
//           });

//           await prisma.physician.deleteMany({
//             where: {
//               physicianName: { contains: identifier },
//             },
//           });

//           await prisma.facility.deleteMany({
//             where: {
//               name: { contains: identifier },
//             },
//           });
//         } catch (cleanupError) {
//           console.log(`Cleanup warning for ${identifier}:`, cleanupError);
//         }
//       }

//       await ensureCommitted();
//     } catch (error) {
//       console.log("Cleanup warning:", error);
//     }

//     // Create test user with transaction
//     const result = await prisma.$transaction(async (tx) => {
//       return await tx.user.upsert({
//         where: { email: "test-user-update-encounter@example.com" },
//         update: {},
//         create: {
//           email: "test-user-update-encounter@example.com",
//           name: "Test User Update Encounter",
//         },
//       });
//     });

//     testUserId = result.id;
//     await ensureCommitted();
//   });

//   afterAll(async () => {
//     // Final cleanup with enhanced error handling
//     try {
//       const testIdentifiers = [
//         "test-user-update-encounter",
//         "John-",
//         "Test Dr. Smith-",
//         "Test Facility A-",
//         "Test Insurance Co",
//         Date.now().toString().slice(-8),
//       ];

//       for (const identifier of testIdentifiers) {
//         try {
//           await prisma.encounter.deleteMany({
//             where: {
//               OR: [
//                 { patient: { firstName: { contains: identifier } } },
//                 { physician: { physicianName: { contains: identifier } } },
//                 { facility: { name: { contains: identifier } } },
//               ],
//             },
//           });

//           await prisma.insurance.deleteMany({
//             where: {
//               OR: [
//                 { insuranceName: { contains: identifier } },
//                 { patient: { firstName: { contains: identifier } } },
//               ],
//             },
//           });

//           await prisma.patient.deleteMany({
//             where: {
//               firstName: { contains: identifier },
//             },
//           });

//           await prisma.physician.deleteMany({
//             where: {
//               physicianName: { contains: identifier },
//             },
//           });

//           await prisma.facility.deleteMany({
//             where: {
//               name: { contains: identifier },
//             },
//           });
//         } catch (cleanupError) {
//           console.log(`Final cleanup warning for ${identifier}:`, cleanupError);
//         }
//       }

//       await prisma.user.deleteMany({
//         where: { email: "test-user-update-encounter@example.com" },
//       });

//       await ensureCommitted();
//     } catch (error) {
//       // Ignore cleanup errors
//       console.log("Final cleanup warning:", error);
//     }
//     await prisma.$disconnect();
//   });

//   test("should validate data helper functions", async () => {
//     // Test validateNonEmptyString
//     expect(validateNonEmptyString("John")).toBe("John");
//     expect(validateNonEmptyString("  ")).toBe(null);
//     expect(validateNonEmptyString("")).toBe(null);
//     expect(validateNonEmptyString(null)).toBe(null);

//     // Test validateEmail
//     expect(validateEmail("test@example.com")).toBe("test@example.com");
//     expect(validateEmail("invalid-email")).toBe(null); // Returns null for invalid emails

//     // Test validatePhone (strips formatting, returns digits only)
//     expect(validatePhone("555-123-4567")).toBe("5551234567");
//     expect(validatePhone("invalid-phone")).toBe(null); // Returns null for invalid phones

//     // Test validateZipCode
//     expect(validateZipCode("12345")).toBe("12345");
//     expect(validateZipCode("abc")).toBe(null); // Returns null for invalid zip codes

//     // Test date standardization (returns full ISO datetime)
//     const result = standardizeDateInput("2024-01-01");
//     expect(result).toMatch(/^2024-01-01T\d{2}:00:00\.000Z$/); // Allow for timezone differences
//     expect(standardizeDateTimeInput("2024-01-01T10:00:00")).toMatch(
//       /^2024-01-01T\d{2}:00:00\.000Z$/,
//     ); // Allow for timezone differences

//     // Test array validation
//     expect(validateAndNormalizeArrayField(["item1", "item2"])).toEqual([
//       "item1",
//       "item2",
//     ]);
//     expect(validateAndNormalizeArrayField("item1, item2")).toEqual([
//       "item1",
//       "item2",
//     ]);
//     expect(validateAndNormalizeArrayField([])).toEqual([]);
//   });

//   test("should update patient details directly with validation", async () => {
//     // Create isolated test patient with unique identifier and transaction
//     const uniqueId =
//       Date.now().toString() + Math.random().toString(36).substr(2, 5);
    
//     const testPatient = await prisma.$transaction(async (tx) => {
//       return await tx.patient.create({
//         data: {
//           firstName: `John-${uniqueId}`,
//           lastName: "Doe",
//           dob: "1990-01-01",
//           billerId: testUserId,
//           version: 1,
//         },
//       });
//     });

//     await ensureCommitted();

//     // Verify patient was created
//     const patientCheck = await retryQuery(() =>
//       prisma.patient.findUnique({ where: { id: testPatient.id } })
//     );
//     if (!patientCheck) {
//       throw new Error(`Patient ${testPatient.id} not found after creation`);
//     }

//     // Test direct patient update with validation
//     const newFirstName = validateNonEmptyString("Jane");
//     const newPhone = validatePhone("555-123-4567");
//     const newZipCode = validateZipCode("12345");

//     expect(newFirstName).toBe("Jane");
//     expect(newPhone).toBe("5551234567"); // Phone validation strips formatting
//     expect(newZipCode).toBe("12345");

//     // Update patient directly with transaction
//     const updateResult = await prisma.$transaction(async (tx) => {
//       return await tx.patient.update({
//         where: { id: testPatient.id },
//         data: {
//           firstName: newFirstName || undefined,
//           phone: newPhone,
//           zipCode: newZipCode,
//           version: { increment: 1 },
//         },
//       });
//     });

//     await ensureCommitted();

//     // Verify the update with retry logic
//     const updatedPatient = await retryQuery(() =>
//       prisma.patient.findUnique({ where: { id: testPatient.id } })
//     );

//     expect(updatedPatient?.firstName).toBe("Jane");
//     expect(updatedPatient?.phone).toBe("5551234567"); // Phone stored without formatting
//     expect(updatedPatient?.zipCode).toBe("12345");
//     expect(updatedPatient?.version).toBe(2);

//     // Clean up with transaction
//     await prisma.$transaction(async (tx) => {
//       await tx.patient.delete({ where: { id: testPatient.id } });
//     });
//   });

//   test("should handle insurance normalization and upsert", async () => {
//     // Create isolated test patient with unique identifier and transaction
//     const uniqueId =
//       Date.now().toString() + Math.random().toString(36).substr(2, 5);
    
//     const testPatient = await prisma.$transaction(async (tx) => {
//       return await tx.patient.create({
//         data: {
//           firstName: `John-${uniqueId}`,
//           lastName: "Doe",
//           dob: "1990-01-01",
//           billerId: testUserId,
//           version: 1,
//         },
//       });
//     });

//     await ensureCommitted();

//     // Verify patient was created
//     const patientCheck = await retryQuery(() =>
//       prisma.patient.findUnique({ where: { id: testPatient.id } })
//     );
//     if (!patientCheck) {
//       throw new Error(`Patient ${testPatient.id} not found after creation`);
//     }

//     // Test insurance data normalization with simpler mock object
//     const mockInsurance = {
//       id: "test-id",
//       insuranceName: "Test Insurance Co",
//       memberId: "MEM789",
//       insurancePhone: "555-INS-1234",
//       patientId: testPatient.id,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       insuranceName_iv: null,
//       insuranceName_tag: null,
//       insurancePhone_iv: null,
//       insurancePhone_tag: null,
//       mailingEmailAddress: null,
//       mailingEmailAddress_iv: null,
//       mailingEmailAddress_tag: null,
//       networkType: null,
//       networkType_iv: null,
//       networkType_tag: null,
//       payerId: null,
//       payerId_iv: null,
//       payerId_tag: null,
//       payerCode: null,
//       payerCode_iv: null,
//       payerCode_tag: null,
//       memberId_iv: null,
//       memberId_tag: null,
//       groupName: null,
//       groupName_iv: null,
//       groupName_tag: null,
//       groupNumber: null,
//       groupNumber_iv: null,
//       groupNumber_tag: null,
//       employerName: null,
//       employerName_iv: null,
//       employerName_tag: null,
//       insuranceType: null,
//       insuranceType_iv: null,
//       insuranceType_tag: null,
//       insurancePlan: null,
//       insurancePlan_iv: null,
//       insurancePlan_tag: null,
//       insuranceStartDate: new Date("2024-01-01"),
//       insuranceEndDate: new Date("2024-12-31"),
//       insuranceCardUrl: null,
//     };

//     const normalized = normalizeInsuranceData(mockInsurance);

//     expect(normalized.insuranceName).toBe("Test Insurance Co");
//     expect(normalized.memberId).toBe("MEM789");
//     expect(normalized.insurancePhone).toBe("555-INS-1234");

//     // Test creating new insurance with transaction
//     const newInsurance = await prisma.$transaction(async (tx) => {
//       return await tx.insurance.create({
//         data: {
//           insuranceName: normalized.insuranceName,
//           memberId: normalized.memberId,
//           insurancePhone: normalized.insurancePhone,
//           patientId: testPatient.id,
//         },
//       });
//     });

//     await ensureCommitted();

//     // Query insurances with retry logic
//     const insurances = await retryQuery(() =>
//       prisma.insurance.findMany({
//         where: { patientId: testPatient.id },
//       })
//     );

//     expect(insurances?.length).toBeGreaterThan(0);
//     expect(insurances?.some((ins) => ins.memberId === "MEM789")).toBe(true);

//     // Clean up with transaction
//     await prisma.$transaction(async (tx) => {
//       await tx.insurance.delete({ where: { id: newInsurance.id } });
//       await tx.patient.delete({ where: { id: testPatient.id } });
//     });
//   });

//   test("should update encounter array fields with normalization", async () => {
//     // Create isolated test data with unique identifiers and transactions
//     const uniqueId =
//       Date.now().toString() + Math.random().toString(36).substr(2, 5);
    
//     const [testPatient, testPhysician, testFacility] = await Promise.all([
//       prisma.$transaction(async (tx) =>
//         tx.patient.create({
//           data: {
//             firstName: `John-${uniqueId}`,
//             lastName: "Doe",
//             dob: "1990-01-01",
//             billerId: testUserId,
//             version: 1,
//           },
//         })
//       ),
//       prisma.$transaction(async (tx) =>
//         tx.physician.create({
//           data: {
//             physicianName: `Test Dr. Smith-${uniqueId}`,
//             physicianNPI: `${uniqueId.slice(-10)}`,
//             version: 1,
//           },
//         })
//       ),
//       prisma.$transaction(async (tx) =>
//         tx.facility.create({
//           data: {
//             name: `Test Facility A-${uniqueId}`,
//             facilityNPI: `FAC${uniqueId.slice(-6)}`,
//             version: 1,
//           },
//         })
//       ),
//     ]);

//     await ensureCommitted();

//     // Verify all entities were created
//     const [patientCheck, physicianCheck, facilityCheck] = await Promise.all([
//       retryQuery(() => prisma.patient.findUnique({ where: { id: testPatient.id } })),
//       retryQuery(() => prisma.physician.findUnique({ where: { id: testPhysician.id } })),
//       retryQuery(() => prisma.facility.findUnique({ where: { id: testFacility.id } })),
//     ]);

//     if (!patientCheck || !physicianCheck || !facilityCheck) {
//       throw new Error(
//         `Missing entities: patient=${!!patientCheck}, physician=${!!physicianCheck}, facility=${!!facilityCheck}`,
//       );
//     }

//     const testEncounter = await prisma.$transaction(async (tx) => {
//       return await tx.encounter.create({
//         data: {
//           patientId: testPatient.id,
//           physicianId: testPhysician.id,
//           facilityId: testFacility.id,
//           appointmentType: "Initial",
//           dateOfServiceStart: "2024-01-01T10:00:00Z",
//           cptCodes: ["99213"],
//           icdCodes: ["Z00.00"],
//           version: 1,
//         },
//       });
//     });

//     await ensureCommitted();

//     // Test array field normalization
//     const cptCodes = validateAndNormalizeArrayField([
//       "99215",
//       "99214",
//       "99213",
//     ]);
//     const icdCodes = validateAndNormalizeArrayField([
//       "M79.1",
//       "E11.9",
//       "Z00.00",
//     ]);
//     const placesOfService = validateAndNormalizeArrayField(
//       "Home, PCP/Physician Office, Outpatient/Facility",
//     );

//     expect(cptCodes).toEqual(["99215", "99214", "99213"]);
//     expect(icdCodes).toEqual(["M79.1", "E11.9", "Z00.00"]);
//     expect(placesOfService).toEqual([
//       "Home",
//       "PCP/Physician Office",
//       "Outpatient/Facility",
//     ]);

//     // Update encounter with normalized array data using transaction
//     const updateResult = await prisma.$transaction(async (tx) => {
//       return await tx.encounter.update({
//         where: { id: testEncounter.id },
//         data: {
//           cptCodes,
//           icdCodes,
//           placesOfService,
//           version: { increment: 1 },
//         },
//       });
//     });

//     await ensureCommitted();

//     // Verify the update immediately from the update result
//     expect(updateResult.cptCodes).toEqual(["99215", "99214", "99213"]);
//     expect(updateResult.icdCodes).toEqual(["M79.1", "E11.9", "Z00.00"]);

//     // Verify the update by re-fetching with retry logic
//     const updatedEncounter = await retryQuery(() =>
//       prisma.encounter.findUnique({ where: { id: testEncounter.id } })
//     );

//     expect(updatedEncounter?.cptCodes).toEqual(["99215", "99214", "99213"]);
//     expect(updatedEncounter?.icdCodes).toEqual(["M79.1", "E11.9", "Z00.00"]);
//     expect(updatedEncounter?.placesOfService).toEqual([
//       "Home",
//       "PCP/Physician Office",
//       "Outpatient/Facility",
//     ]);
//     expect(updatedEncounter?.version).toBe(2);

//     // Clean up with transaction and error handling
//     await prisma.$transaction(async (tx) => {
//       await tx.encounter.delete({ where: { id: testEncounter.id } });
//       await tx.patient.delete({ where: { id: testPatient.id } });
//       await tx.physician.delete({ where: { id: testPhysician.id } });
//       await tx.facility.delete({ where: { id: testFacility.id } });
//     });
//   });

//   test("should handle physician updates with validation", async () => {
//     // Create isolated test physician with unique identifier and transaction
//     const uniqueId =
//       Date.now().toString() + Math.random().toString(36).substr(2, 5);
    
//     const testPhysician = await prisma.$transaction(async (tx) => {
//       return await tx.physician.create({
//         data: {
//           physicianName: `Test Dr. Smith-${uniqueId}`,
//           physicianNPI: `${uniqueId.slice(-10)}`,
//           version: 1,
//         },
//       });
//     });

//     await ensureCommitted();

//     // Verify physician exists before proceeding with retry logic
//     const physicianCheck = await retryQuery(() =>
//       prisma.physician.findUnique({ where: { id: testPhysician.id } })
//     );
//     if (!physicianCheck) {
//       throw new Error(`Physician ${testPhysician.id} not found after creation`);
//     }

//     const validEmail = validateEmail("dr.smith@clinic.com");
//     const validPhone = validatePhone("555-987-6543");

//     expect(validEmail).toBe("dr.smith@clinic.com");
//     expect(validPhone).toBe("5559876543"); // Phone validation strips formatting

//     // Update physician with transaction
//     const updateResult = await prisma.$transaction(async (tx) => {
//       return await tx.physician.update({
//         where: { id: testPhysician.id },
//         data: {
//           physicianName: "Test Dr. Johnson",
//           physicianEmail: validEmail || undefined,
//           physicianPhone: validPhone || undefined,
//           version: { increment: 1 },
//         },
//       });
//     });

//     await ensureCommitted();

//     // Verify the update with retry logic
//     const updatedPhysician = await retryQuery(() =>
//       prisma.physician.findUnique({ where: { id: testPhysician.id } })
//     );

//     expect(updatedPhysician?.physicianName).toBe("Test Dr. Johnson");
//     expect(updatedPhysician?.physicianEmail).toBe("dr.smith@clinic.com");
//     expect(updatedPhysician?.physicianPhone).toBe("5559876543"); // Phone stored without formatting
//     expect(updatedPhysician?.version).toBe(2);

//     // Clean up with transaction
//     await prisma.$transaction(async (tx) => {
//       await tx.physician.delete({ where: { id: testPhysician.id } });
//     });
//   });

//   test("should handle facility updates with validation", async () => {
//     // Create isolated test facility with unique identifier and transaction
//     const uniqueId =
//       Date.now().toString() + Math.random().toString(36).substr(2, 5);
    
//     const testFacility = await prisma.$transaction(async (tx) => {
//       return await tx.facility.create({
//         data: {
//           name: `Test Facility A-${uniqueId}`,
//           facilityNPI: `FAC${uniqueId.slice(-6)}`,
//           version: 1,
//         },
//       });
//     });

//     await ensureCommitted();

//     // Verify facility was created with retry logic
//     const facilityCheck = await retryQuery(() =>
//       prisma.facility.findUnique({ where: { id: testFacility.id } })
//     );
//     if (!facilityCheck) {
//       throw new Error(`Facility ${testFacility.id} not found after creation`);
//     }

//     const validPhone = validatePhone("555-111-2222");
//     const validZip = validateZipCode("67890");

//     expect(validPhone).toBe("5551112222"); // Phone validation strips formatting
//     expect(validZip).toBe("67890");

//     // Update facility with transaction
//     const updateResult = await prisma.$transaction(async (tx) => {
//       return await tx.facility.update({
//         where: { id: testFacility.id },
//         data: {
//           name: "Test Facility Updated",
//           facilityPhone: validPhone || undefined,
//           zipCode: validZip || undefined,
//           version: { increment: 1 },
//         },
//       });
//     });

//     await ensureCommitted();

//     // Verify the update with retry logic
//     const updatedFacility = await retryQuery(() =>
//       prisma.facility.findUnique({ where: { id: testFacility.id } })
//     );

//     expect(updatedFacility?.name).toBe("Test Facility Updated");
//     expect(updatedFacility?.facilityPhone).toBe("5551112222"); // Phone stored without formatting
//     expect(updatedFacility?.zipCode).toBe("67890");
//     expect(updatedFacility?.version).toBe(2);

//     // Clean up with transaction
//     await prisma.$transaction(async (tx) => {
//       await tx.facility.delete({ where: { id: testFacility.id } });
//     });
//   });

//   test("should handle date and datetime normalization", async () => {
//     // Create isolated test data with unique identifiers and transactions
//     const uniqueId =
//       Date.now().toString() + Math.random().toString(36).substr(2, 5);
    
//     const [testPatient, testPhysician, testFacility] = await Promise.all([
//       prisma.$transaction(async (tx) =>
//         tx.patient.create({
//           data: {
//             firstName: `John-${uniqueId}`,
//             lastName: "Doe",
//             dob: "1990-01-01",
//             billerId: testUserId,
//             version: 1,
//           },
//         })
//       ),
//       prisma.$transaction(async (tx) =>
//         tx.physician.create({
//           data: {
//             physicianName: `Test Dr. Smith-${uniqueId}`,
//             physicianNPI: `${uniqueId.slice(-10)}`,
//             version: 1,
//           },
//         })
//       ),
//       prisma.$transaction(async (tx) =>
//         tx.facility.create({
//           data: {
//             name: `Test Facility A-${uniqueId}`,
//             facilityNPI: `FAC${uniqueId.slice(-6)}`,
//             version: 1,
//           },
//         })
//       ),
//     ]);

//     await ensureCommitted();

//     // Verify all entities were created
//     const [patientCheck, physicianCheck, facilityCheck] = await Promise.all([
//       retryQuery(() => prisma.patient.findUnique({ where: { id: testPatient.id } })),
//       retryQuery(() => prisma.physician.findUnique({ where: { id: testPhysician.id } })),
//       retryQuery(() => prisma.facility.findUnique({ where: { id: testFacility.id } })),
//     ]);

//     if (!patientCheck || !physicianCheck || !facilityCheck) {
//       throw new Error(
//         `Missing entities for date test: patient=${!!patientCheck}, physician=${!!physicianCheck}, facility=${!!facilityCheck}`,
//       );
//     }

//     // Test date normalization
//     const serviceDate = standardizeDateInput("2024-01-01");
//     const serviceDateTime = standardizeDateTimeInput("2024-01-01T10:00:00");
//     const dobNormalized = standardizeDateInput("1990-05-15");

//     // Create encounter with normalized dates using transaction
//     const testEncounter = await prisma.$transaction(async (tx) => {
//       return await tx.encounter.create({
//         data: {
//           patientId: testPatient.id,
//           physicianId: testPhysician.id,
//           facilityId: testFacility.id,
//           dateOfServiceStart: serviceDateTime,
//           dateOfServiceEnd: serviceDateTime,
//           version: 1,
//         },
//       });
//     });

//     // Update patient with normalized DOB using transaction
//     await prisma.$transaction(async (tx) => {
//       await tx.patient.update({
//         where: { id: testPatient.id },
//         data: {
//           dob: dobNormalized,
//           version: { increment: 1 },
//         },
//       });
//     });

//     await ensureCommitted();

//     // Verify date storage with retry logic
//     const [updatedEncounter, updatedPatient] = await Promise.all([
//       retryQuery(() => prisma.encounter.findUnique({ where: { id: testEncounter.id } })),
//       retryQuery(() => prisma.patient.findUnique({ where: { id: testPatient.id } })),
//     ]);

//     // Verify dates are stored in ISO format
//     expect(updatedEncounter?.dateOfServiceStart).toMatch(
//       /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
//     );
//     expect(updatedPatient?.dob).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);

//     // Clean up with transaction
//     await prisma.$transaction(async (tx) => {
//       await tx.encounter.delete({ where: { id: testEncounter.id } });
//       await tx.patient.delete({ where: { id: testPatient.id } });
//       await tx.physician.delete({ where: { id: testPhysician.id } });
//       await tx.facility.delete({ where: { id: testFacility.id } });
//     });
//   });

//   test("should handle transaction and version management", async () => {
//     // Create isolated test data with unique identifiers and transactions
//     const uniqueId =
//       Date.now().toString() + Math.random().toString(36).substr(2, 5);
    
//     const [testPatient, testPhysician] = await Promise.all([
//       prisma.$transaction(async (tx) =>
//         tx.patient.create({
//           data: {
//             firstName: `John-${uniqueId}`,
//             lastName: "Doe",
//             dob: "1990-01-01",
//             billerId: testUserId,
//             version: 1,
//           },
//         })
//       ),
//       prisma.$transaction(async (tx) =>
//         tx.physician.create({
//           data: {
//             physicianName: `Test Dr. Smith-${uniqueId}`,
//             physicianNPI: `${uniqueId.slice(-10)}`,
//             version: 1,
//           },
//         })
//       ),
//     ]);

//     await ensureCommitted();

//     // Verify entities were created
//     const [patientCheck, physicianCheck] = await Promise.all([
//       retryQuery(() => prisma.patient.findUnique({ where: { id: testPatient.id } })),
//       retryQuery(() => prisma.physician.findUnique({ where: { id: testPhysician.id } })),
//     ]);

//     if (!patientCheck || !physicianCheck) {
//       throw new Error(
//         `Missing entities for transaction test: patient=${!!patientCheck}, physician=${!!physicianCheck}`,
//       );
//     }

//     // Test optimistic locking - update patient version
//     const updateResult = await prisma.$transaction(async (tx) => {
//       // First check current version
//       const currentPatient = await tx.patient.findUnique({
//         where: { id: testPatient.id },
//       });

//       if (!currentPatient) {
//         throw new Error("Patient not found for version check");
//       }

//       // Update with version check
//       return await tx.patient.update({
//         where: {
//           id: testPatient.id,
//           version: currentPatient.version, // Optimistic locking
//         },
//         data: {
//           firstName: "Jane Updated",
//           version: { increment: 1 },
//         },
//       });
//     });

//     await ensureCommitted();

//     expect(updateResult.firstName).toBe("Jane Updated");
//     expect(updateResult.version).toBe(2);

//     // Test transaction rollback simulation
//     let transactionError: Error | null = null;
//     try {
//       await prisma.$transaction(async (tx) => {
//         // Update patient
//         await tx.patient.update({
//           where: { id: testPatient.id },
//           data: {
//             firstName: "Should Not Persist",
//             version: { increment: 1 },
//           },
//         });

//         // Simulate error that causes rollback
//         throw new Error("Simulated transaction error");
//       });
//     } catch (error) {
//       transactionError = error as Error;
//     }

//     await ensureCommitted();

//     expect(transactionError?.message).toBe("Simulated transaction error");

//     // Verify patient was not updated due to rollback
//     const patientAfterRollback = await retryQuery(() =>
//       prisma.patient.findUnique({ where: { id: testPatient.id } })
//     );

//     expect(patientAfterRollback?.firstName).toBe("Jane Updated"); // Should still be the previous value
//     expect(patientAfterRollback?.version).toBe(2); // Version should not have incremented

//     // Clean up with transaction
//     await prisma.$transaction(async (tx) => {
//       await tx.patient.delete({ where: { id: testPatient.id } });
//       await tx.physician.delete({ where: { id: testPhysician.id } });
//     });
//   });

//   test("should validate error handling for invalid data", async () => {
//     // Test validation function error handling
//     expect(validateEmail("invalid-email")).toBe(null);
//     expect(validatePhone("invalid-phone")).toBe(null);
//     expect(validateZipCode("invalid-zip")).toBe(null);
//     expect(validateNonEmptyString("")).toBe(null);
//     expect(validateNonEmptyString("   ")).toBe(null);

//     // Test array normalization with invalid data
//     expect(validateAndNormalizeArrayField(null)).toEqual([]);
//     expect(validateAndNormalizeArrayField(undefined)).toEqual([]);
//     expect(validateAndNormalizeArrayField("")).toEqual([]);

//     // Test insurance normalization with missing data
//     const incompleteInsurance = {
//       id: "test",
//       patientId: null,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       // All other fields intentionally missing/null
//     };

//     // Should not throw an error
//     const normalized = normalizeInsuranceData(incompleteInsurance as any);
//     expect(normalized).toBeDefined();
//     expect(typeof normalized.insuranceName).toBe("string");
//   });
// });
