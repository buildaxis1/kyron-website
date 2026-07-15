/*
  Warnings:

  - A unique constraint covering the columns `[vendor,fhirBaseUrl,environment,organizationId]` on the table `Practice` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Insurance" ALTER COLUMN "insuranceStartDate" SET DEFAULT '''1900-01-01T00:00:00.000Z''';

-- AlterTable
ALTER TABLE "Patient" ALTER COLUMN "dob" SET DEFAULT '''1900-01-01T00:00:00.000Z''';

-- CreateIndex
CREATE UNIQUE INDEX "Practice_vendor_fhirBaseUrl_environment_organizationId_key" ON "Practice"("vendor", "fhirBaseUrl", "environment", "organizationId");
