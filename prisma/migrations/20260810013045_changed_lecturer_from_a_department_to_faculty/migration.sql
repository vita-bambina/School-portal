/*
  Warnings:

  - You are about to drop the column `departmentId` on the `lecturer` table. All the data in the column will be lost.
  - Added the required column `facultyId` to the `Lecturer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `lecturer` DROP FOREIGN KEY `Lecturer_departmentId_fkey`;

-- DropIndex
DROP INDEX `Lecturer_departmentId_fkey` ON `lecturer`;

-- AlterTable
ALTER TABLE `lecturer` DROP COLUMN `departmentId`,
    ADD COLUMN `facultyId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Lecturer` ADD CONSTRAINT `Lecturer_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `Faculty`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
