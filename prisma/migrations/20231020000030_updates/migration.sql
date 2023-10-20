/*
  Warnings:

  - The `serviceStatus` column on the `services` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `feedback_forms` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "serviceStatus" AS ENUM ('available', 'upcoming');

-- AlterEnum
ALTER TYPE "appointmentStatus" ADD VALUE 'cancelled';

-- AlterTable
ALTER TABLE "services" DROP COLUMN "serviceStatus",
ADD COLUMN     "serviceStatus" "serviceStatus" NOT NULL DEFAULT 'available';

-- DropTable
DROP TABLE "feedback_forms";

-- DropEnum
DROP TYPE "chooseServiceStatus";

-- CreateTable
CREATE TABLE "feedbacks" (
    "feedbackId" TEXT NOT NULL,
    "feedbackSubject" TEXT NOT NULL,
    "feedbackDescription" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "feedbacks_pkey" PRIMARY KEY ("feedbackId")
);

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("profileId") ON DELETE RESTRICT ON UPDATE CASCADE;
