/*
  Warnings:

  - You are about to drop the column `callDuration` on the `BillerAction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BillerAction" DROP COLUMN "callDuration",
ADD COLUMN     "callDurationSeconds" INTEGER;

-- AlterTable
ALTER TABLE "Encounter" ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Facility" ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Insurance" ALTER COLUMN "insuranceStartDate" SET DEFAULT '''1900-01-01T00:00:00.000Z''';

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "dob" SET DEFAULT '''1900-01-01T00:00:00.000Z''';

-- AlterTable
ALTER TABLE "Physician" ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 1;
