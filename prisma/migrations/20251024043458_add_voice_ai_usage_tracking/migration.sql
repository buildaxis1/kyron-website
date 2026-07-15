-- AlterTable
ALTER TABLE "Insurance" ALTER COLUMN "insuranceStartDate" SET DEFAULT '''1900-01-01T00:00:00.000Z''';

-- AlterTable
ALTER TABLE "OrganizationAction" ADD COLUMN     "callDurationSeconds" INTEGER,
ADD COLUMN     "callEndTime" TIMESTAMP(3),
ADD COLUMN     "callStartTime" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Patient" ALTER COLUMN "dob" SET DEFAULT '''1900-01-01T00:00:00.000Z''';
