-- CreateEnum
CREATE TYPE "EhrVendor" AS ENUM ('MODMED', 'AMAZING_CHARTS');

-- CreateEnum
CREATE TYPE "SourceSystem" AS ENUM ('MODMED', 'AMAZING_CHARTS', 'MANUAL');

-- CreateEnum
CREATE TYPE "PracticeEnvironment" AS ENUM ('PRODUCTION', 'SANDBOX');

-- AlterTable
ALTER TABLE "Encounter" ADD COLUMN     "appointmentStatus" TEXT,
ADD COLUMN     "fhirAppointmentId" TEXT,
ADD COLUMN     "fhirEncounterId" TEXT,
ADD COLUMN     "scheduledEnd" TIMESTAMP(3),
ADD COLUMN     "scheduledStart" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Insurance" ALTER COLUMN "insuranceStartDate" SET DEFAULT '''1900-01-01T00:00:00.000Z''';

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "mrnSystem" TEXT,
ADD COLUMN     "mrnValue" TEXT,
ALTER COLUMN "dob" SET DEFAULT '''1900-01-01T00:00:00.000Z''';

-- CreateTable
CREATE TABLE "Practice" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "vendor" "EhrVendor" NOT NULL,
    "fhirBaseUrl" TEXT NOT NULL,
    "ssmClientIdParam" TEXT NOT NULL,
    "ssmClientSecretParam" TEXT NOT NULL,
    "ssmApiKeyParam" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "environment" "PracticeEnvironment" NOT NULL DEFAULT 'PRODUCTION',
    "lastConnectedAt" TIMESTAMP(3),
    "oauthAuthUrlOverride" TEXT,
    "oauthTokenUrlOverride" TEXT,
    "scopes" TEXT,
    "organizationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Practice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutboundMessage" (
    "id" TEXT NOT NULL,
    "practiceId" TEXT NOT NULL,
    "vendor" "EhrVendor" NOT NULL,
    "resourceType" TEXT NOT NULL,
    "localType" TEXT NOT NULL,
    "localId" TEXT NOT NULL,
    "fhirId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "attemptCount" INTEGER NOT NULL DEFAULT 0,
    "lastError" TEXT,
    "payloadSha" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OutboundMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SyncCursor" (
    "id" TEXT NOT NULL,
    "practiceId" TEXT NOT NULL,
    "resource" TEXT NOT NULL,
    "since" TIMESTAMP(3) NOT NULL,
    "lastRunAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'OK',
    "lastError" TEXT,

    CONSTRAINT "SyncCursor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EhrPatientLink" (
    "id" TEXT NOT NULL,
    "practiceId" TEXT NOT NULL,
    "vendor" "EhrVendor" NOT NULL,
    "patientId" TEXT NOT NULL,
    "fhirPatientId" TEXT NOT NULL,
    "mrnSystem" TEXT,
    "mrnValue" TEXT,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EhrPatientLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EhrEncounterLink" (
    "id" TEXT NOT NULL,
    "practiceId" TEXT NOT NULL,
    "vendor" "EhrVendor" NOT NULL,
    "encounterId" TEXT NOT NULL,
    "fhirEncounterId" TEXT,
    "fhirAppointmentId" TEXT,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EhrEncounterLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "practiceId" TEXT NOT NULL,
    "patientId" TEXT,
    "encounterId" TEXT,
    "fileId" TEXT NOT NULL,
    "type" TEXT,
    "categoryCodes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "status" TEXT,
    "docDate" TIMESTAMP(3),
    "fhirDocumentReferenceId" TEXT NOT NULL,
    "sha256" TEXT,
    "sizeBytes" INTEGER,
    "source" "SourceSystem" NOT NULL DEFAULT 'MODMED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EhrDocumentLink" (
    "id" TEXT NOT NULL,
    "practiceId" TEXT NOT NULL,
    "vendor" "EhrVendor" NOT NULL,
    "documentId" TEXT NOT NULL,
    "fhirDocumentReferenceId" TEXT NOT NULL,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "etag" TEXT,

    CONSTRAINT "EhrDocumentLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EhrLocationLink" (
    "id" TEXT NOT NULL,
    "practiceId" TEXT NOT NULL,
    "facilityId" TEXT NOT NULL,
    "fhirLocationId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "effectiveStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effectiveEnd" TIMESTAMP(3),

    CONSTRAINT "EhrLocationLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Practice_organizationId_idx" ON "Practice"("organizationId");

-- CreateIndex
CREATE INDEX "OutboundMessage_practiceId_resourceType_status_idx" ON "OutboundMessage"("practiceId", "resourceType", "status");

-- CreateIndex
CREATE UNIQUE INDEX "SyncCursor_practiceId_resource_key" ON "SyncCursor"("practiceId", "resource");

-- CreateIndex
CREATE INDEX "EhrPatientLink_patientId_idx" ON "EhrPatientLink"("patientId");

-- CreateIndex
CREATE INDEX "EhrPatientLink_practiceId_vendor_mrnSystem_mrnValue_idx" ON "EhrPatientLink"("practiceId", "vendor", "mrnSystem", "mrnValue");

-- CreateIndex
CREATE UNIQUE INDEX "EhrPatientLink_practiceId_fhirPatientId_key" ON "EhrPatientLink"("practiceId", "fhirPatientId");

-- CreateIndex
CREATE INDEX "EhrEncounterLink_encounterId_idx" ON "EhrEncounterLink"("encounterId");

-- CreateIndex
CREATE INDEX "EhrEncounterLink_practiceId_vendor_fhirAppointmentId_idx" ON "EhrEncounterLink"("practiceId", "vendor", "fhirAppointmentId");

-- CreateIndex
CREATE UNIQUE INDEX "EhrEncounterLink_practiceId_fhirEncounterId_key" ON "EhrEncounterLink"("practiceId", "fhirEncounterId");

-- CreateIndex
CREATE INDEX "Document_patientId_idx" ON "Document"("patientId");

-- CreateIndex
CREATE INDEX "Document_encounterId_idx" ON "Document"("encounterId");

-- CreateIndex
CREATE INDEX "Document_practiceId_docDate_idx" ON "Document"("practiceId", "docDate");

-- CreateIndex
CREATE UNIQUE INDEX "Document_practiceId_fhirDocumentReferenceId_key" ON "Document"("practiceId", "fhirDocumentReferenceId");

-- CreateIndex
CREATE UNIQUE INDEX "EhrDocumentLink_fhirDocumentReferenceId_key" ON "EhrDocumentLink"("fhirDocumentReferenceId");

-- CreateIndex
CREATE INDEX "EhrDocumentLink_practiceId_vendor_documentId_idx" ON "EhrDocumentLink"("practiceId", "vendor", "documentId");

-- CreateIndex
CREATE INDEX "EhrLocationLink_facilityId_idx" ON "EhrLocationLink"("facilityId");

-- CreateIndex
CREATE UNIQUE INDEX "EhrLocationLink_practiceId_fhirLocationId_key" ON "EhrLocationLink"("practiceId", "fhirLocationId");

-- CreateIndex
CREATE INDEX "Encounter_patientId_idx" ON "Encounter"("patientId");

-- CreateIndex
CREATE INDEX "Encounter_physicianId_idx" ON "Encounter"("physicianId");

-- CreateIndex
CREATE INDEX "Encounter_facilityId_idx" ON "Encounter"("facilityId");

-- CreateIndex
CREATE INDEX "Encounter_fhirAppointmentId_idx" ON "Encounter"("fhirAppointmentId");

-- CreateIndex
CREATE INDEX "Encounter_fhirEncounterId_idx" ON "Encounter"("fhirEncounterId");

-- CreateIndex
CREATE INDEX "Encounter_scheduledStart_appointmentStatus_idx" ON "Encounter"("scheduledStart", "appointmentStatus");

-- CreateIndex
CREATE INDEX "File_encounterId_idx" ON "File"("encounterId");

-- CreateIndex
CREATE INDEX "Insurance_patientId_idx" ON "Insurance"("patientId");

-- CreateIndex
CREATE INDEX "OrganizationAction_encounterId_idx" ON "OrganizationAction"("encounterId");

-- CreateIndex
CREATE INDEX "Patient_mrnSystem_mrnValue_idx" ON "Patient"("mrnSystem", "mrnValue");

-- AddForeignKey
ALTER TABLE "OutboundMessage" ADD CONSTRAINT "OutboundMessage_practiceId_fkey" FOREIGN KEY ("practiceId") REFERENCES "Practice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SyncCursor" ADD CONSTRAINT "SyncCursor_practiceId_fkey" FOREIGN KEY ("practiceId") REFERENCES "Practice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EhrPatientLink" ADD CONSTRAINT "EhrPatientLink_practiceId_fkey" FOREIGN KEY ("practiceId") REFERENCES "Practice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EhrPatientLink" ADD CONSTRAINT "EhrPatientLink_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EhrEncounterLink" ADD CONSTRAINT "EhrEncounterLink_practiceId_fkey" FOREIGN KEY ("practiceId") REFERENCES "Practice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EhrEncounterLink" ADD CONSTRAINT "EhrEncounterLink_encounterId_fkey" FOREIGN KEY ("encounterId") REFERENCES "Encounter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_practiceId_fkey" FOREIGN KEY ("practiceId") REFERENCES "Practice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_encounterId_fkey" FOREIGN KEY ("encounterId") REFERENCES "Encounter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EhrDocumentLink" ADD CONSTRAINT "EhrDocumentLink_practiceId_fkey" FOREIGN KEY ("practiceId") REFERENCES "Practice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EhrDocumentLink" ADD CONSTRAINT "EhrDocumentLink_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EhrLocationLink" ADD CONSTRAINT "EhrLocationLink_practiceId_fkey" FOREIGN KEY ("practiceId") REFERENCES "Practice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EhrLocationLink" ADD CONSTRAINT "EhrLocationLink_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "Facility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
