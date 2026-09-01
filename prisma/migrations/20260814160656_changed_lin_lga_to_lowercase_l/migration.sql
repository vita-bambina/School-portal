/*
  Warnings:

  - You are about to drop the column `Lga` on the `enrollment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `enrollment` DROP COLUMN `Lga`,
    ADD COLUMN `lga` VARCHAR(191) NULL;
