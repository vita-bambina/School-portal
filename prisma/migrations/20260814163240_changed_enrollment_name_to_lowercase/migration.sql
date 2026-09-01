/*
  Warnings:

  - You are about to drop the column `CurrentState` on the `enrollment` table. All the data in the column will be lost.
  - You are about to drop the column `CurrentstateLGA` on the `enrollment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `enrollment` DROP COLUMN `CurrentState`,
    DROP COLUMN `CurrentstateLGA`,
    ADD COLUMN `currentState` VARCHAR(191) NULL,
    ADD COLUMN `currentstateLGA` VARCHAR(191) NULL;
