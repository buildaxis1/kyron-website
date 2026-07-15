// import { test, expect } from "@playwright/test";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// // Test data factory function to generate unique IDs per test
// function createTestData() {
//   const timestamp = Date.now();
//   const random = Math.floor(Math.random() * 1000);
//   const uniqueId = `ui-test-${timestamp}-${random}`;

//   const testPatient = {
//     id: `${uniqueId}-patient`,
//     firstName: "John",
//     lastName: "Doe",
//     dob: "1990-01-01",
//     sex: "Male",
//     address: "123 Main St",
//     city: "Anytown",
//     state: "CA",
//     zipCode: "12345",
//     phone: "555-1234",
//     billerId: `${uniqueId}-biller`,
//   };

//   const testInsurance = {
//     id: `${uniqueId}-insurance`,
//     insuranceName: "Blue Cross",
//     memberId: "BC123456",
//     insurancePhone: "555-9999",
//     patientId: testPatient.id,
//   };

//   const testPhysician = {
//     id: `${uniqueId}-physician`,
//     physicianName: "Dr. Smith",
//     physicianNPI: "1234567890",
//     physicianOPN: "OPN123",
//     physicianTIN: "TIN456",
//     physicianAddress: "456 Medical Dr",
//     physicianCity: "Doctorville",
//     physicianState: "CA",
//     physicianZip: "54321",
//     physicianPhone: "555-7777",
//     physicianEmail: "dr.smith@example.com",
//   };

//   const testFacility = {
//     id: `${uniqueId}-facility`,
//     name: "General Hospital",
//     facilityNPI: "9876543210",
//     facilityCode: "GH001",
//     address: "789 Hospital Blvd",
//     city: "Medtown",
//     state: "CA",
//     zipCode: "67890",
//     facilityPhone: "555-8888",
//   };

//   const testEncounter = {
//     id: `${uniqueId}-encounter`,
//     patientId: testPatient.id,
//     physicianId: testPhysician.id,
//     facilityId: testFacility.id,
//     status: "Pending Information",
//     priority: "SAME_DAY" as const,
//     appointmentType: "Follow-Up (F/U)",
//     patientClass: "O - Outpatient",
//     dateOfServiceStart: "2024-01-15T10:00:00Z",
//     cptCodes: ["99213"],
//     cptDescriptions: ["Office visit"],
//     icdCodes: ["Z00.00"],
//     icdDescriptions: ["General examination"],
//     placesOfService: ["PCP/Physician Office"],
//     serviceTypes: ["Consultation"],
//     modifiers: ["25"],
//     bodyParts: ["Head"],
//     testNames: ["Blood Test"],
//     testCodes: ["LAB001"],
//     customFields: ["Custom1"],
//     transactionId: "TXN001",
//     productGroupId: "PG001",
//     productId: "P001",
//   };

//   return {
//     testPatient,
//     testInsurance,
//     testPhysician,
//     testFacility,
//     testEncounter,
//     uniqueId,
//   };
// }

// test.describe("Biller Dashboard UI - Update Patient Encounter", () => {
//   // Store test data for cleanup
//   let currentTestData: ReturnType<typeof createTestData> | null = null;

//   test.beforeEach(async ({ page }) => {
//     // Create unique test data for this test
//     currentTestData = createTestData();
//     const {
//       testPatient,
//       testInsurance,
//       testPhysician,
//       testFacility,
//       testEncounter,
//       uniqueId,
//     } = currentTestData;

//     // Clean up any existing test data with this prefix
//     await prisma.encounter.deleteMany({
//       where: { id: { startsWith: uniqueId } },
//     });
//     await prisma.insurance.deleteMany({
//       where: { id: { startsWith: uniqueId } },
//     });
//     await prisma.patient.deleteMany({
//       where: { id: { startsWith: uniqueId } },
//     });
//     await prisma.physician.deleteMany({
//       where: { id: { startsWith: uniqueId } },
//     });
//     await prisma.facility.deleteMany({
//       where: { id: { startsWith: uniqueId } },
//     });

//     // Create test data
//     await prisma.patient.create({ data: testPatient });
//     await prisma.insurance.create({ data: testInsurance });
//     await prisma.physician.create({ data: testPhysician });
//     await prisma.facility.create({ data: testFacility });
//     await prisma.encounter.create({ data: testEncounter });

//     // Handle authentication and server availability
//     try {
//       await page.goto("/organization/dashboard/user_2rHpefhvDTNfuZJvRYS3NsFycOM", {
//         waitUntil: "networkidle",
//       });

//       // Check if redirected to login
//       if (page.url().includes("sign-in") || page.url().includes("login")) {
//         test.skip(true, "Authentication required for UI tests");
//       }

//       // Check if we're on the right page
//       await page.waitForSelector("body", { timeout: 5000 });
//     } catch (error) {
//       console.log("Navigation error, skipping UI tests:", error);
//       test.skip(
//         true,
//         "Unable to navigate to dashboard - ensure dev server is running on http://localhost:3000",
//       );
//     }
//   });

//   test.afterEach(async () => {
//     // Clean up test data using the stored test data
//     if (currentTestData) {
//       const { uniqueId } = currentTestData;
//       await prisma.encounter.deleteMany({
//         where: { id: { startsWith: uniqueId } },
//       });
//       await prisma.insurance.deleteMany({
//         where: { id: { startsWith: uniqueId } },
//       });
//       await prisma.patient.deleteMany({
//         where: { id: { startsWith: uniqueId } },
//       });
//       await prisma.physician.deleteMany({
//         where: { id: { startsWith: uniqueId } },
//       });
//       await prisma.facility.deleteMany({
//         where: { id: { startsWith: uniqueId } },
//       });
//       currentTestData = null;
//     }
//   });

//   test("should open patient modal and navigate to details tab", async ({
//     page,
//   }) => {
//     if (!currentTestData) throw new Error("Test data not initialized");
//     const { testPatient } = currentTestData;

//     // Wait for the page to load and find the patient row
//     await page.waitForSelector("table tbody tr", { timeout: 10000 });

//     // Click on the patient row containing our test patient
//     await page.click(`text=${testPatient.firstName}`);

//     // Wait for the modal to open
//     await page.waitForSelector(
//       'div[role="dialog"], .modal, div:has(button:has-text("Details"))',
//       { timeout: 10000 },
//     );

//     // Click on the Details tab
//     await page.click('button:has-text("Details")');

//     // Wait for the details form to load
//     await page.waitForSelector("form", { timeout: 5000 });

//     // Verify we're in the details tab
//     await expect(page.locator('label:has-text("First Name")')).toBeVisible();
//     await expect(page.locator('label:has-text("Last Name")')).toBeVisible();
//     await expect(page.locator('label:has-text("Date of Birth")')).toBeVisible();
//   });

//   test("should update patient first name", async ({ page }) => {
//     if (!currentTestData) throw new Error("Test data not initialized");
//     const { testPatient } = currentTestData;

//     await page.waitForSelector("table tbody tr", { timeout: 10000 });
//     await page.click(`text=${testPatient.firstName}`);
//     await page.waitForSelector('div:has(button:has-text("Details"))', {
//       timeout: 10000,
//     });
//     await page.click('button:has-text("Details")');
//     await page.waitForSelector("form");

//     // Find and click the edit button for first name
//     const firstNameSection = page
//       .locator('label:has-text("First Name")')
//       .locator("..");
//     await firstNameSection.locator('button:has-text("Edit")').click();

//     // Update the first name
//     const firstNameInput = firstNameSection.locator("input");
//     await firstNameInput.fill("Jane");

//     // Click elsewhere to blur the input
//     await page.click('label:has-text("Last Name")');

//     // Submit the form
//     await page.click('button:has-text("Save Details")');

//     // Wait for success message
//     await page.waitForSelector("text=Details saved", { timeout: 10000 });

//     // Verify the change was saved
//     const updatedPatient = await prisma.patient.findUnique({
//       where: { id: testPatient.id },
//     });
//     expect(updatedPatient?.firstName).toBe("Jane");
//   });

//   test("should update patient address information", async ({ page }) => {
//     if (!currentTestData) throw new Error("Test data not initialized");
//     const { testPatient } = currentTestData;

//     await page.waitForSelector("table tbody tr", { timeout: 10000 });
//     await page.click(`text=${testPatient.firstName}`);
//     await page.waitForSelector('div:has(button:has-text("Details"))', {
//       timeout: 10000,
//     });
//     await page.click('button:has-text("Details")');
//     await page.waitForSelector("form");

//     // Update address
//     const addressSection = page
//       .locator('label:has-text("Address")')
//       .locator("..");
//     await addressSection.locator('button:has-text("Edit")').click();
//     await addressSection.locator("input").fill("456 New Street");
//     await page.click('label:has-text("City")');

//     // Update city
//     const citySection = page.locator('label:has-text("City")').locator("..");
//     await citySection.locator('button:has-text("Edit")').click();
//     await citySection.locator("input").fill("Newtown");
//     await page.click('label:has-text("State")');

//     // Update state
//     const stateSection = page.locator('label:has-text("State")').locator("..");
//     await stateSection.locator('button:has-text("Edit")').click();
//     await stateSection.locator("select").selectOption("NY");
//     await page.click('label:has-text("Zip Code")');

//     // Submit the form
//     await page.click('button:has-text("Save Details")');
//     await page.waitForSelector("text=Details saved", { timeout: 10000 });

//     // Verify the changes were saved
//     const updatedPatient = await prisma.patient.findUnique({
//       where: { id: testPatient.id },
//     });
//     expect(updatedPatient?.address).toBe("456 New Street");
//     expect(updatedPatient?.city).toBe("Newtown");
//     expect(updatedPatient?.state).toBe("NY");
//   });

//   test("should update insurance information", async ({ page }) => {
//     if (!currentTestData) throw new Error("Test data not initialized");
//     const { testPatient, testInsurance } = currentTestData;

//     await page.waitForSelector("table tbody tr", { timeout: 10000 });
//     await page.click(`text=${testPatient.firstName}`);
//     await page.waitForSelector('div:has(button:has-text("Details"))', {
//       timeout: 10000,
//     });
//     await page.click('button:has-text("Details")');
//     await page.waitForSelector("form");

//     // Scroll to insurance section
//     await page
//       .locator('h2:has-text("Insurance Details")')
//       .scrollIntoViewIfNeeded();

//     // Update insurance name
//     const insuranceSection = page
//       .locator('label:has-text("Insurance Name")')
//       .locator("..");
//     await insuranceSection.locator('button:has-text("Edit")').click();
//     await insuranceSection.locator("input").fill("Aetna Health");
//     await page.click('label:has-text("Member ID")');

//     // Update member ID
//     const memberIdSection = page
//       .locator('label:has-text("Member ID")')
//       .locator("..");
//     await memberIdSection.locator('button:has-text("Edit")').click();
//     await memberIdSection.locator("input").fill("AET789012");
//     await page.click('label:has-text("Insurance Phone")');

//     // Submit the form
//     await page.click('button:has-text("Save Details")');
//     await page.waitForSelector("text=Details saved", { timeout: 10000 });

//     // Verify the changes were saved
//     const updatedInsurance = await prisma.insurance.findUnique({
//       where: { id: testInsurance.id },
//     });
//     expect(updatedInsurance?.insuranceName).toBe("Aetna Health");
//     expect(updatedInsurance?.memberId).toBe("AET789012");
//   });

//   test("should update physician information", async ({ page }) => {
//     if (!currentTestData) throw new Error("Test data not initialized");
//     const { testPatient, testPhysician } = currentTestData;

//     await page.waitForSelector("table tbody tr", { timeout: 10000 });
//     await page.click(`text=${testPatient.firstName}`);
//     await page.waitForSelector('div:has(button:has-text("Details"))', {
//       timeout: 10000,
//     });
//     await page.click('button:has-text("Details")');
//     await page.waitForSelector("form");

//     // Scroll to physician section
//     await page
//       .locator('h2:has-text("Ordering Physician Details")')
//       .scrollIntoViewIfNeeded();

//     // Update physician name
//     const physicianSection = page
//       .locator('label:has-text("Physician Name")')
//       .locator("..");
//     await physicianSection.locator('button:has-text("Edit")').click();
//     await physicianSection.locator("input").fill("Dr. Johnson");
//     await page.click('label:has-text("Physician NPI")');

//     // Update physician NPI
//     const npiSection = page
//       .locator('label:has-text("Physician NPI")')
//       .locator("..");
//     await npiSection.locator('button:has-text("Edit")').click();
//     await npiSection.locator("input").fill("0987654321");
//     await page.click('label:has-text("Physician Email")');

//     // Submit the form
//     await page.click('button:has-text("Save Details")');
//     await page.waitForSelector("text=Details saved", { timeout: 10000 });

//     // Verify the changes were saved
//     const updatedPhysician = await prisma.physician.findUnique({
//       where: { id: testPhysician.id },
//     });
//     expect(updatedPhysician?.physicianName).toBe("Dr. Johnson");
//     expect(updatedPhysician?.physicianNPI).toBe("0987654321");
//   });

//   test("should update facility information", async ({ page }) => {
//     if (!currentTestData) throw new Error("Test data not initialized");
//     const { testPatient, testFacility } = currentTestData;

//     await page.waitForSelector("table tbody tr", { timeout: 10000 });
//     await page.click(`text=${testPatient.firstName}`);
//     await page.waitForSelector('div:has(button:has-text("Details"))', {
//       timeout: 10000,
//     });
//     await page.click('button:has-text("Details")');
//     await page.waitForSelector("form");

//     // Scroll to facility section
//     await page
//       .locator('h2:has-text("Facility Details")')
//       .scrollIntoViewIfNeeded();

//     // Update facility name
//     const facilitySection = page
//       .locator('label:has-text("Facility Name")')
//       .locator("..");
//     await facilitySection.locator('button:has-text("Edit")').click();
//     await facilitySection.locator("input").fill("City Medical Center");
//     await page.click('label:has-text("Facility NPI")');

//     // Submit the form
//     await page.click('button:has-text("Save Details")');
//     await page.waitForSelector("text=Details saved", { timeout: 10000 });

//     // Verify the changes were saved
//     const updatedFacility = await prisma.facility.findUnique({
//       where: { id: testFacility.id },
//     });
//     expect(updatedFacility?.name).toBe("City Medical Center");
//   });

//   test("should update encounter details", async ({ page }) => {
//     if (!currentTestData) throw new Error("Test data not initialized");
//     const { testPatient } = currentTestData;

//     await page.waitForSelector("table tbody tr", { timeout: 10000 });
//     await page.click(`text=${testPatient.firstName}`);
//     await page.waitForSelector('div:has(button:has-text("Details"))', {
//       timeout: 10000,
//     });
//     await page.click('button:has-text("Details")');
//     await page.waitForSelector("form");

//     // Scroll to encounter section
//     await page
//       .locator('h2:has-text("Encounter Details")')
//       .scrollIntoViewIfNeeded();

//     // Update appointment type
//     const appointmentSection = page
//       .locator('label:has-text("Appointment Type")')
//       .locator("..");
//     await appointmentSection.locator('button:has-text("Edit")').click();
//     await appointmentSection.locator("select").selectOption("Sick Visit (SV)");
//     await page.click('label:has-text("Patient Class")');

//     // Submit the form
//     await page.click('button:has-text("Save Details")');
//     await page.waitForSelector("text=Details saved", { timeout: 10000 });
//   });

//   test("should handle validation and error messages", async ({ page }) => {
//     if (!currentTestData) throw new Error("Test data not initialized");
//     const { testPatient } = currentTestData;

//     await page.waitForSelector("table tbody tr", { timeout: 10000 });
//     await page.click(`text=${testPatient.firstName}`);
//     await page.waitForSelector('div:has(button:has-text("Details"))', {
//       timeout: 10000,
//     });
//     await page.click('button:has-text("Details")');
//     await page.waitForSelector("form");

//     // Try to submit without making any changes
//     await page.click('button:has-text("Save Details")');

//     // Should see error message about no changes
//     await expect(page.locator("text=No changes to save")).toBeVisible({
//       timeout: 5000,
//     });
//   });
// });
