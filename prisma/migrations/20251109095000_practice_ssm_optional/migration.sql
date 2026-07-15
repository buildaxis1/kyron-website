-- Make SSM parameter columns nullable and remove defaults for optional usage
ALTER TABLE "Practice"
ALTER COLUMN "ssmUsernameParam" DROP DEFAULT,
ALTER COLUMN "ssmPasswordParam" DROP DEFAULT,
ALTER COLUMN "ssmClientIdParam" DROP DEFAULT,
ALTER COLUMN "ssmClientSecretParam" DROP DEFAULT;

ALTER TABLE "Practice"
ALTER COLUMN "ssmUsernameParam" DROP NOT NULL,
ALTER COLUMN "ssmPasswordParam" DROP NOT NULL,
ALTER COLUMN "ssmClientIdParam" DROP NOT NULL,
ALTER COLUMN "ssmClientSecretParam" DROP NOT NULL;

