-- Add SSM username/password parameter columns to Practice
ALTER TABLE "Practice"
ADD COLUMN "ssmUsernameParam" TEXT NOT NULL DEFAULT '',
ADD COLUMN "ssmPasswordParam" TEXT NOT NULL DEFAULT '';

-- Optional: If you want to drop the defaults later, you can run a follow-up migration
-- ALTER TABLE "Practice" ALTER COLUMN "ssmUsernameParam" DROP DEFAULT;
-- ALTER TABLE "Practice" ALTER COLUMN "ssmPasswordParam" DROP DEFAULT;

