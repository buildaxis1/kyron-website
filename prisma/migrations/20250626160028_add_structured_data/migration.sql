-- AlterTable
ALTER TABLE "BillerAction" ADD COLUMN     "structuredData" JSONB;

-- AlterTable
ALTER TABLE "Insurance" ALTER COLUMN "insuranceStartDate" SET DEFAULT '''1900-01-01T00:00:00.000Z''';

-- AlterTable
ALTER TABLE "Patient" ALTER COLUMN "dob" SET DEFAULT '''1900-01-01T00:00:00.000Z''';
