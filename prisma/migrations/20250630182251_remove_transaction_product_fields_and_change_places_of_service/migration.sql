/*
  Warnings:

  - You are about to drop the column `productGroupId` on the `Encounter` table. All the data in the column will be lost.
  - You are about to drop the column `productGroupId_iv` on the `Encounter` table. All the data in the column will be lost.
  - You are about to drop the column `productGroupId_tag` on the `Encounter` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Encounter` table. All the data in the column will be lost.
  - You are about to drop the column `productId_iv` on the `Encounter` table. All the data in the column will be lost.
  - You are about to drop the column `productId_tag` on the `Encounter` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `Encounter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Encounter" DROP COLUMN "productGroupId",
DROP COLUMN "productGroupId_iv",
DROP COLUMN "productGroupId_tag",
DROP COLUMN "productId",
DROP COLUMN "productId_iv",
DROP COLUMN "productId_tag",
DROP COLUMN "transactionId",
ALTER COLUMN "placesOfService" DROP NOT NULL,
ALTER COLUMN "placesOfService" DROP DEFAULT,
ALTER COLUMN "placesOfService" SET DATA TYPE TEXT,
ALTER COLUMN "placesOfService_iv" DROP NOT NULL,
ALTER COLUMN "placesOfService_iv" DROP DEFAULT,
ALTER COLUMN "placesOfService_iv" SET DATA TYPE TEXT,
ALTER COLUMN "placesOfService_tag" DROP NOT NULL,
ALTER COLUMN "placesOfService_tag" DROP DEFAULT,
ALTER COLUMN "placesOfService_tag" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Insurance" ALTER COLUMN "insuranceStartDate" SET DEFAULT '''1900-01-01T00:00:00.000Z''';

-- AlterTable
ALTER TABLE "Patient" ALTER COLUMN "dob" SET DEFAULT '''1900-01-01T00:00:00.000Z''';
