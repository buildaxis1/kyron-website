/*
  Warnings:

  - The values [ELIBIGIBILITY_AND_BENEFITS] on the enum `Action` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('STAT', 'SAME_DAY', 'SAME_WEEK', 'NOT_APPLICABLE');

-- AlterEnum
BEGIN;
CREATE TYPE "Action_new" AS ENUM ('ELIGIBILITY_AND_BENEFITS', 'APPEALS', 'CLAIM_STATUS_INQUIRIES', 'DENIALS');
ALTER TABLE "BillerAction" ALTER COLUMN "type" TYPE "Action_new" USING ("type"::text::"Action_new");
ALTER TYPE "Action" RENAME TO "Action_old";
ALTER TYPE "Action_new" RENAME TO "Action";
DROP TYPE "Action_old";
COMMIT;

-- DropIndex
DROP INDEX "Encounter_transactionId_key";

-- AlterTable
ALTER TABLE "Encounter" ADD COLUMN     "priority" "Priority" NOT NULL DEFAULT 'SAME_DAY';

-- AlterTable
ALTER TABLE "Insurance" ALTER COLUMN "insuranceStartDate" SET DEFAULT '''1900-01-01T00:00:00.000Z''';

-- AlterTable
ALTER TABLE "Patient" ALTER COLUMN "dob" SET DEFAULT '''1900-01-01T00:00:00.000Z''';
