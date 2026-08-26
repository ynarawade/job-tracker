-- CreateEnum
CREATE TYPE "JobApplicationExtractionStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "JobApplication" ADD COLUMN     "extractionState" "JobApplicationExtractionStatus" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "job_title" DROP NOT NULL,
ALTER COLUMN "company" DROP NOT NULL,
ALTER COLUMN "jd_formatted" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "platform" DROP NOT NULL;
