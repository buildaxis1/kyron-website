/*
  Warnings:

  - You are about to drop the column `callEndTime` on the `OrganizationAction` table. All the data in the column will be lost.
  - You are about to drop the column `callStartTime` on the `OrganizationAction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Insurance" ALTER COLUMN "insuranceStartDate" SET DEFAULT '''1900-01-01T00:00:00.000Z''';

-- AlterTable
ALTER TABLE "OrganizationAction" DROP COLUMN "callEndTime",
DROP COLUMN "callStartTime";

-- AlterTable
ALTER TABLE "Patient" ALTER COLUMN "dob" SET DEFAULT '''1900-01-01T00:00:00.000Z''';

-- CreateTable
CREATE TABLE "ReceptionistCall" (
    "id" TEXT NOT NULL,
    "dialId" TEXT NOT NULL,
    "status" TEXT,
    "endReason" TEXT,
    "transcript" JSONB,
    "aiResult" JSONB,
    "durationSeconds" INTEGER,
    "toNumber" TEXT,
    "organizationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReceptionistCall_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReceptionistCall_dialId_key" ON "ReceptionistCall"("dialId");

-- CreateIndex
CREATE INDEX "ReceptionistCall_dialId_idx" ON "ReceptionistCall"("dialId");

-- CreateIndex
CREATE INDEX "ReceptionistCall_organizationId_idx" ON "ReceptionistCall"("organizationId");

-- CreateIndex
CREATE INDEX "ReceptionistCall_status_idx" ON "ReceptionistCall"("status");

-- CreateIndex
CREATE INDEX "ReceptionistCall_createdAt_idx" ON "ReceptionistCall"("createdAt");
