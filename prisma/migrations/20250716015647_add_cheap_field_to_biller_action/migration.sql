/*
  Warnings:

  - You are about to drop the column `callDurationSeconds` on the `BillerAction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BillerAction" DROP COLUMN "callDurationSeconds",
ADD COLUMN     "cheap" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Insurance" ALTER COLUMN "insuranceStartDate" SET DEFAULT '''1900-01-01T00:00:00.000Z''';

-- AlterTable
ALTER TABLE "Patient" ALTER COLUMN "dob" SET DEFAULT '''1900-01-01T00:00:00.000Z''';
