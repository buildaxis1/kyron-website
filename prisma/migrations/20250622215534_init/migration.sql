-- CreateEnum
CREATE TYPE "Action" AS ENUM ('ELIBIGIBILITY_AND_BENEFITS', 'APPEALS', 'CLAIM_STATUS_INQUIRIES', 'DENIALS');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "lastPasswordAt" TIMESTAMP(3),
    "lastActivityAt" TIMESTAMP(3),
    "isDeactivated" BOOLEAN NOT NULL DEFAULT false,
    "deactivatedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordHistory" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PasswordHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "mainImage" TEXT NOT NULL,
    "imageUrls" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL DEFAULT 'missing_patient_id',
    "firstName" TEXT NOT NULL DEFAULT 'patient_name',
    "firstName_iv" TEXT,
    "firstName_tag" TEXT,
    "middleName" TEXT,
    "middleName_iv" TEXT,
    "middleName_tag" TEXT,
    "lastName" TEXT NOT NULL DEFAULT 'patient_name',
    "lastName_iv" TEXT,
    "lastName_tag" TEXT,
    "sex" TEXT,
    "sex_iv" TEXT,
    "sex_tag" TEXT,
    "dob" TEXT NOT NULL DEFAULT '''1900-01-01T00:00:00.000Z''',
    "dob_iv" TEXT,
    "dob_tag" TEXT,
    "address" TEXT,
    "address_iv" TEXT,
    "address_tag" TEXT,
    "city" TEXT,
    "city_iv" TEXT,
    "city_tag" TEXT,
    "state" TEXT,
    "state_iv" TEXT,
    "state_tag" TEXT,
    "zipCode" TEXT,
    "zipCode_iv" TEXT,
    "zipCode_tag" TEXT,
    "phone" TEXT,
    "phone_iv" TEXT,
    "phone_tag" TEXT,
    "billerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Insurance" (
    "id" TEXT NOT NULL,
    "insuranceName" TEXT DEFAULT 'missing_insurance_name',
    "insuranceName_iv" TEXT,
    "insuranceName_tag" TEXT,
    "memberId" TEXT DEFAULT 'missing_member_id',
    "memberId_iv" TEXT,
    "memberId_tag" TEXT,
    "insurancePhone" TEXT DEFAULT 'missing_insurance_phone',
    "insurancePhone_iv" TEXT,
    "insurancePhone_tag" TEXT,
    "mailingEmailAddress" TEXT,
    "mailingEmailAddress_iv" TEXT,
    "mailingEmailAddress_tag" TEXT,
    "networkType" TEXT,
    "networkType_iv" TEXT,
    "networkType_tag" TEXT,
    "insurancePlan" TEXT,
    "insurancePlan_iv" TEXT,
    "insurancePlan_tag" TEXT,
    "insuranceStartDate" TIMESTAMP(3) NOT NULL DEFAULT '''1900-01-01T00:00:00.000Z''',
    "insuranceEndDate" TIMESTAMP(3),
    "payerCode" TEXT,
    "payerCode_iv" TEXT,
    "payerCode_tag" TEXT,
    "groupName" TEXT,
    "groupName_iv" TEXT,
    "groupName_tag" TEXT,
    "groupNumber" TEXT,
    "groupNumber_iv" TEXT,
    "groupNumber_tag" TEXT,
    "employerName" TEXT,
    "employerName_iv" TEXT,
    "employerName_tag" TEXT,
    "insuranceCardUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "patientId" TEXT,

    CONSTRAINT "Insurance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Physician" (
    "id" TEXT NOT NULL,
    "physicianName" TEXT NOT NULL DEFAULT 'missing_physician_name',
    "physicianName_iv" TEXT,
    "physicianName_tag" TEXT,
    "physicianNPI" TEXT NOT NULL DEFAULT 'missing_npi',
    "physicianNPI_iv" TEXT,
    "physicianNPI_tag" TEXT,
    "physicianOPN" TEXT,
    "physicianOPN_iv" TEXT,
    "physicianOPN_tag" TEXT,
    "physicianTIN" TEXT,
    "physicianTIN_iv" TEXT,
    "physicianTIN_tag" TEXT,
    "physicianExternalId" TEXT,
    "physicianExternalId_iv" TEXT,
    "physicianExternalId_tag" TEXT,
    "physicianAddress" TEXT,
    "physicianAddress_iv" TEXT,
    "physicianAddress_tag" TEXT,
    "physicianCity" TEXT,
    "physicianCity_iv" TEXT,
    "physicianCity_tag" TEXT,
    "physicianState" TEXT,
    "physicianState_iv" TEXT,
    "physicianState_tag" TEXT,
    "physicianZip" TEXT,
    "physicianZip_iv" TEXT,
    "physicianZip_tag" TEXT,
    "physicianPhone" TEXT,
    "physicianPhone_iv" TEXT,
    "physicianPhone_tag" TEXT,
    "physicianFax" TEXT,
    "physicianFax_iv" TEXT,
    "physicianFax_tag" TEXT,
    "physicianEmail" TEXT,
    "physicianEmail_iv" TEXT,
    "physicianEmail_tag" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Physician_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Facility" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "name_iv" TEXT,
    "name_tag" TEXT,
    "facilityNPI" TEXT NOT NULL DEFAULT 'missing_npi',
    "facilityNPI_iv" TEXT,
    "facilityNPI_tag" TEXT,
    "facilityCode" TEXT,
    "facilityCode_iv" TEXT,
    "facilityCode_tag" TEXT,
    "address" TEXT NOT NULL DEFAULT 'missing_address',
    "address_iv" TEXT,
    "address_tag" TEXT,
    "city" TEXT NOT NULL DEFAULT 'missing_city',
    "city_iv" TEXT,
    "city_tag" TEXT,
    "state" TEXT NOT NULL DEFAULT 'missing_state',
    "state_iv" TEXT,
    "state_tag" TEXT,
    "zipCode" TEXT NOT NULL DEFAULT 'missing_zip',
    "zipCode_iv" TEXT,
    "zipCode_tag" TEXT,
    "facilityPhone" TEXT,
    "facilityPhone_iv" TEXT,
    "facilityPhone_tag" TEXT,
    "facilityFax" TEXT,
    "facilityFax_iv" TEXT,
    "facilityFax_tag" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Facility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Encounter" (
    "id" TEXT NOT NULL,
    "transactionId" TEXT,
    "appointmentType" TEXT NOT NULL DEFAULT 'Select',
    "appointmentType_iv" TEXT,
    "appointmentType_tag" TEXT,
    "appointmentTypeCode" TEXT NOT NULL DEFAULT '',
    "appointmentTypeCode_iv" TEXT,
    "appointmentTypeCode_tag" TEXT,
    "patientClass" TEXT NOT NULL DEFAULT 'Select',
    "patientClass_iv" TEXT,
    "patientClass_tag" TEXT,
    "dateOfServiceStart" TEXT NOT NULL,
    "dateOfServiceStart_iv" TEXT,
    "dateOfServiceStart_tag" TEXT,
    "dateOfServiceEnd" TEXT,
    "dateOfServiceEnd_iv" TEXT,
    "dateOfServiceEnd_tag" TEXT,
    "cptCodes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "cptCodes_iv" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "cptCodes_tag" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "cptDescriptions" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "cptDescriptions_iv" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "cptDescriptions_tag" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "icdCodes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "icdCodes_iv" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "icdCodes_tag" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "icdDescriptions" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "icdDescriptions_iv" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "icdDescriptions_tag" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "placesOfService" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "placesOfService_iv" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "placesOfService_tag" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "serviceTypes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "serviceTypes_iv" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "serviceTypes_tag" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "modifiers" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "modifiers_iv" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "modifiers_tag" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "bodyParts" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "bodyParts_iv" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "bodyParts_tag" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "testNames" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "testNames_iv" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "testNames_tag" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "testCodes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "testCodes_iv" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "testCodes_tag" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "customFields" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "customFields_iv" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "customFields_tag" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "productGroupId" TEXT,
    "productGroupId_iv" TEXT,
    "productGroupId_tag" TEXT,
    "productId" TEXT,
    "productId_iv" TEXT,
    "productId_tag" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "patientId" TEXT NOT NULL,
    "physicianId" TEXT NOT NULL,
    "facilityId" TEXT NOT NULL,

    CONSTRAINT "Encounter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillerAction" (
    "id" TEXT NOT NULL,
    "encounterId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" "Action" NOT NULL,
    "content" TEXT,
    "content_iv" TEXT,
    "content_tag" TEXT,
    "transcript" TEXT,
    "transcript_iv" TEXT,
    "transcript_tag" TEXT,
    "summary" TEXT,
    "summary_iv" TEXT,
    "summary_tag" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "billerId" TEXT NOT NULL,

    CONSTRAINT "BillerAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "name_iv" TEXT,
    "name_tag" TEXT,
    "fileType" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "url_iv" TEXT,
    "url_tag" TEXT,
    "key" TEXT NOT NULL,
    "key_iv" TEXT,
    "key_tag" TEXT,
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "billerActionId" TEXT,
    "encounterId" TEXT,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "Encounter_transactionId_key" ON "Encounter"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "File_url_key" ON "File"("url");

-- AddForeignKey
ALTER TABLE "PasswordHistory" ADD CONSTRAINT "PasswordHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Insurance" ADD CONSTRAINT "Insurance_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Insurance" ADD CONSTRAINT "Insurance_insuranceCardUrl_fkey" FOREIGN KEY ("insuranceCardUrl") REFERENCES "File"("url") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Encounter" ADD CONSTRAINT "Encounter_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Encounter" ADD CONSTRAINT "Encounter_physicianId_fkey" FOREIGN KEY ("physicianId") REFERENCES "Physician"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Encounter" ADD CONSTRAINT "Encounter_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "Facility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillerAction" ADD CONSTRAINT "BillerAction_encounterId_fkey" FOREIGN KEY ("encounterId") REFERENCES "Encounter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_billerActionId_fkey" FOREIGN KEY ("billerActionId") REFERENCES "BillerAction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_encounterId_fkey" FOREIGN KEY ("encounterId") REFERENCES "Encounter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
