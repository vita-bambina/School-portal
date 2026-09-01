/*
  Warnings:

  - You are about to drop the column `jambResult` on the `enrollment` table. All the data in the column will be lost.
  - You are about to drop the column `lga` on the `enrollment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `course` ADD COLUMN `courseunit` INTEGER NULL;

-- AlterTable
ALTER TABLE `enrollment` DROP COLUMN `jambResult`,
    DROP COLUMN `lga`,
    MODIFY `status` ENUM('IN_PROGRESS', 'PENDING', 'ADMITTED', 'REJECTED') NOT NULL DEFAULT 'IN_PROGRESS';
