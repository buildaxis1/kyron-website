/*
  Warnings:

  - The `placesOfService` column on the `Encounter` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `placesOfService_iv` column on the `Encounter` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `placesOfService_tag` column on the `Encounter` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "BillerAction" ADD COLUMN     "callDuration" INTEGER;

-- AlterTable
ALTER TABLE "Encounter" ADD COLUMN     "productGroupId" TEXT,
ADD COLUMN     "productGroupId_iv" TEXT,
ADD COLUMN     "productGroupId_tag" TEXT,
ADD COLUMN     "productId" TEXT,
ADD COLUMN     "productId_iv" TEXT,
ADD COLUMN     "productId_tag" TEXT,
ADD COLUMN     "transactionId" TEXT,
DROP COLUMN "placesOfService",
ADD COLUMN     "placesOfService" TEXT[] DEFAULT ARRAY[]::TEXT[],
DROP COLUMN "placesOfService_iv",
ADD COLUMN     "placesOfService_iv" TEXT[] DEFAULT ARRAY[]::TEXT[],
DROP COLUMN "placesOfService_tag",
ADD COLUMN     "placesOfService_tag" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "Insurance" ALTER COLUMN "insuranceStartDate" SET DEFAULT '''1900-01-01T00:00:00.000Z''';

-- AlterTable
ALTER TABLE "Patient" ALTER COLUMN "dob" SET DEFAULT '''1900-01-01T00:00:00.000Z''';
