/*
  Warnings:

  - The values [cancelled] on the enum `appointmentStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `profileId` on the `feedback_forms` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `feedback_forms` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "appointmentStatus_new" AS ENUM ('pending', 'approved', 'rejected');
ALTER TABLE "appointment_bookings" ALTER COLUMN "appointmentStatus" DROP DEFAULT;
ALTER TABLE "appointment_bookings" ALTER COLUMN "appointmentStatus" TYPE "appointmentStatus_new" USING ("appointmentStatus"::text::"appointmentStatus_new");
ALTER TYPE "appointmentStatus" RENAME TO "appointmentStatus_old";
ALTER TYPE "appointmentStatus_new" RENAME TO "appointmentStatus";
DROP TYPE "appointmentStatus_old";
ALTER TABLE "appointment_bookings" ALTER COLUMN "appointmentStatus" SET DEFAULT 'pending';
COMMIT;

-- DropForeignKey
ALTER TABLE "feedback_forms" DROP CONSTRAINT "feedback_forms_profileId_fkey";

-- DropForeignKey
ALTER TABLE "feedback_forms" DROP CONSTRAINT "feedback_forms_serviceId_fkey";

-- AlterTable
ALTER TABLE "feedback_forms" DROP COLUMN "profileId",
DROP COLUMN "serviceId",
ADD COLUMN     "contactNumber" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "userName" TEXT;
