-- AlterTable: Remove callStartTime and callEndTime columns if they exist
-- These fields are no longer needed as they should be stored in structuredData JSON field
ALTER TABLE "OrganizationAction" DROP COLUMN IF EXISTS "callStartTime";
ALTER TABLE "OrganizationAction" DROP COLUMN IF EXISTS "callEndTime";

