/*
  Warnings:

  - You are about to drop the column `extractionState` on the `JobApplication` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "JobApplication" DROP COLUMN "extractionState",
ADD COLUMN     "extraction_state" "JobApplicationExtractionStatus" NOT NULL DEFAULT 'PENDING';
