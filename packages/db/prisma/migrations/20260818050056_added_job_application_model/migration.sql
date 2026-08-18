-- CreateEnum
CREATE TYPE "JobSlaryCurrencyType" AS ENUM ('INR', 'USD', 'EUR');

-- CreateEnum
CREATE TYPE "JobApplicationStatus" AS ENUM ('APPLIED', 'SCREENING', 'INTERVIEW', 'OFFER', 'REJECTED', 'GHOSTED');

-- CreateEnum
CREATE TYPE "JobLocationType" AS ENUM ('REMOTE', 'ONSITE', 'HYBRID');

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "followup_freq" INTEGER NOT NULL DEFAULT 7;

-- CreateTable
CREATE TABLE "JobApplication" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "job_title" TEXT NOT NULL,
    "job_url" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "jd_text" TEXT NOT NULL,
    "jd_formatted" TEXT NOT NULL,
    "contact_mail" TEXT,
    "location" TEXT,
    "location_type" "JobLocationType",
    "salary_min" DECIMAL(65,30),
    "salary_max" DECIMAL(65,30),
    "salary_currency" "JobSlaryCurrencyType",
    "skills" TEXT[],
    "status" "JobApplicationStatus" NOT NULL DEFAULT 'APPLIED',
    "platform" TEXT NOT NULL,
    "followup_freq_override" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
