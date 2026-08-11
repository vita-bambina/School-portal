/*
  Warnings:

  - A unique constraint covering the columns `[referenceNumber]` on the table `Enrollment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `referenceNumber` to the `Enrollment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `enrollment` ADD COLUMN `referenceNumber` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Enrollment_referenceNumber_key` ON `Enrollment`(`referenceNumber`);
