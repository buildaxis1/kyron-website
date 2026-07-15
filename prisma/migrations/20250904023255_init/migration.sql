/*
  Warnings:

  - You are about to drop the column `billerActionId` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `billerId` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the `BillerAction` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "EncounterType" AS ENUM ('ELIGIBILITY_AND_BENEFITS', 'CLAIM_STATUS_INQUIRIES', 'DENIAL_APPEALS');

-- DropForeignKey
ALTER TABLE "BillerAction" DROP CONSTRAINT "BillerAction_encounterId_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_billerActionId_fkey";

-- AlterTable
ALTER TABLE "Encounter" ADD COLUMN     "amountToBePaid" TEXT,
ADD COLUMN     "amountToBePaid_iv" TEXT,
ADD COLUMN     "amountToBePaid_tag" TEXT,
ADD COLUMN     "claimNumber" TEXT,
ADD COLUMN     "claimNumber_iv" TEXT,
ADD COLUMN     "claimNumber_tag" TEXT,
ADD COLUMN     "encounterType" "EncounterType" NOT NULL DEFAULT 'ELIGIBILITY_AND_BENEFITS';

-- AlterTable
ALTER TABLE "File" DROP COLUMN "billerActionId",
ADD COLUMN     "organizationActionId" TEXT;

-- AlterTable
ALTER TABLE "Insurance" ALTER COLUMN "insuranceStartDate" SET DEFAULT '''1900-01-01T00:00:00.000Z''';

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "billerId",
ADD COLUMN     "organizationId" TEXT,
ALTER COLUMN "dob" SET DEFAULT '''1900-01-01T00:00:00.000Z''';

-- DropTable
DROP TABLE "BillerAction";

-- CreateTable
CREATE TABLE "OrganizationAction" (
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
    "structuredData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "organizationId" TEXT,

    CONSTRAINT "OrganizationAction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrganizationAction" ADD CONSTRAINT "OrganizationAction_encounterId_fkey" FOREIGN KEY ("encounterId") REFERENCES "Encounter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_organizationActionId_fkey" FOREIGN KEY ("organizationActionId") REFERENCES "OrganizationAction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
