-- CreateTable: OrganizationInsurancePhoneMapping
CREATE TABLE IF NOT EXISTS "OrganizationInsurancePhoneMapping" (
  "id" TEXT NOT NULL,
  "organizationId" TEXT NOT NULL,
  "insuranceName" TEXT NOT NULL,
  "insurancePhone" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "OrganizationInsurancePhoneMapping_pkey" PRIMARY KEY ("id")
);

-- Unique constraint for (organizationId, insuranceName)
CREATE UNIQUE INDEX IF NOT EXISTS "OrganizationInsurancePhoneMapping_organizationId_insuranceName_key"
ON "OrganizationInsurancePhoneMapping"("organizationId","insuranceName");


-- CreateTable: OrganizationPhysicianNpiMapping
CREATE TABLE IF NOT EXISTS "OrganizationPhysicianNpiMapping" (
  "id" TEXT NOT NULL,
  "organizationId" TEXT NOT NULL,
  "physicianName" TEXT NOT NULL,
  "physicianNpi" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "OrganizationPhysicianNpiMapping_pkey" PRIMARY KEY ("id")
);

-- Unique constraint for (organizationId, physicianName)
CREATE UNIQUE INDEX IF NOT EXISTS "OrganizationPhysicianNpiMapping_organizationId_physicianName_key"
ON "OrganizationPhysicianNpiMapping"("organizationId","physicianName");


