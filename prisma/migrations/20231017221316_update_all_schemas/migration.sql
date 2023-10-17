/*
  Warnings:

  - A unique constraint covering the columns `[profileId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "appointmentStatus" AS ENUM ('cancelled', 'pending', 'approved', 'rejected');

-- CreateEnum
CREATE TYPE "chooseServiceStatus" AS ENUM ('Available', 'Upcoming', 'Rejected');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "profileId" TEXT;

-- CreateTable
CREATE TABLE "profiles" (
    "profileId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "profileImage" TEXT,
    "role" "userRole" NOT NULL DEFAULT 'USER',
    "contactNumber" TEXT,
    "address" TEXT,
    "coverPhoto" TEXT,
    "bloodGroup" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("profileId")
);

-- CreateTable
CREATE TABLE "doctors" (
    "doctorId" TEXT NOT NULL,
    "qualification" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profileId" TEXT NOT NULL,
    "specializationId" TEXT NOT NULL,

    CONSTRAINT "doctors_pkey" PRIMARY KEY ("doctorId")
);

-- CreateTable
CREATE TABLE "services" (
    "serviceId" TEXT NOT NULL,
    "serviceName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "serviceImage" TEXT NOT NULL,
    "servicePrice" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "serviceStatus" "chooseServiceStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("serviceId")
);

-- CreateTable
CREATE TABLE "categories" (
    "categoryId" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("categoryId")
);

-- CreateTable
CREATE TABLE "reviews_and_ratings" (
    "reviewId" TEXT NOT NULL,
    "reviewComment" TEXT NOT NULL,
    "reviewRating" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profileId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "reviews_and_ratings_pkey" PRIMARY KEY ("reviewId")
);

-- CreateTable
CREATE TABLE "blogs" (
    "blogId" TEXT NOT NULL,
    "blogTitle" TEXT NOT NULL,
    "blogDescription" TEXT NOT NULL,
    "blogImage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("blogId")
);

-- CreateTable
CREATE TABLE "faqs" (
    "faqId" TEXT NOT NULL,
    "faqTitle" TEXT NOT NULL,
    "faqDescription" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "faqs_pkey" PRIMARY KEY ("faqId")
);

-- CreateTable
CREATE TABLE "products" (
    "productId" TEXT NOT NULL,
    "productTitle" TEXT NOT NULL,
    "productDescription" TEXT NOT NULL,
    "productImage" TEXT NOT NULL,
    "productPrice" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "serviceId" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "specializations" (
    "specializationId" TEXT NOT NULL,
    "specializationName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "specializations_pkey" PRIMARY KEY ("specializationId")
);

-- CreateTable
CREATE TABLE "appointment_bookings" (
    "appointmentId" TEXT NOT NULL,
    "appointmentDate" TIMESTAMP(3) NOT NULL,
    "appointmentStatus" "appointmentStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profileId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "slotId" TEXT NOT NULL,

    CONSTRAINT "appointment_bookings_pkey" PRIMARY KEY ("appointmentId")
);

-- CreateTable
CREATE TABLE "time_slots" (
    "slotId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "time_slots_pkey" PRIMARY KEY ("slotId")
);

-- CreateTable
CREATE TABLE "feedback_forms" (
    "feedbackId" TEXT NOT NULL,
    "feedbackComment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "serviceId" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "feedback_forms_pkey" PRIMARY KEY ("feedbackId")
);

-- CreateIndex
CREATE UNIQUE INDEX "doctors_profileId_key" ON "doctors"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "services_serviceName_key" ON "services"("serviceName");

-- CreateIndex
CREATE UNIQUE INDEX "categories_categoryName_key" ON "categories"("categoryName");

-- CreateIndex
CREATE UNIQUE INDEX "specializations_specializationName_key" ON "specializations"("specializationName");

-- CreateIndex
CREATE UNIQUE INDEX "time_slots_startTime_key" ON "time_slots"("startTime");

-- CreateIndex
CREATE UNIQUE INDEX "time_slots_endTime_key" ON "time_slots"("endTime");

-- CreateIndex
CREATE UNIQUE INDEX "users_profileId_key" ON "users"("profileId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("profileId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("profileId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_specializationId_fkey" FOREIGN KEY ("specializationId") REFERENCES "specializations"("specializationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews_and_ratings" ADD CONSTRAINT "reviews_and_ratings_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("profileId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews_and_ratings" ADD CONSTRAINT "reviews_and_ratings_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("serviceId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("profileId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faqs" ADD CONSTRAINT "faqs_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("profileId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("serviceId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("profileId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment_bookings" ADD CONSTRAINT "appointment_bookings_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("profileId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment_bookings" ADD CONSTRAINT "appointment_bookings_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("serviceId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment_bookings" ADD CONSTRAINT "appointment_bookings_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "time_slots"("slotId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback_forms" ADD CONSTRAINT "feedback_forms_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("serviceId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback_forms" ADD CONSTRAINT "feedback_forms_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("profileId") ON DELETE RESTRICT ON UPDATE CASCADE;
