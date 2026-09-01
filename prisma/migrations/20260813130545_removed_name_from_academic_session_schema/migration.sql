/*
  Warnings:

  - You are about to drop the column `name` on the `academicsession` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Academicsession_name_key` ON `academicsession`;

-- AlterTable
ALTER TABLE `academicsession` DROP COLUMN `name`;
