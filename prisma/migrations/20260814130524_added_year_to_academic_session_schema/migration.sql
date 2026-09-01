/*
  Warnings:

  - Added the required column `year` to the `Academicsession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `academicsession` ADD COLUMN `year` VARCHAR(191) NOT NULL;
