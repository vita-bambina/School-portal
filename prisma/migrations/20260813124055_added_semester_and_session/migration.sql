/*
  Warnings:

  - You are about to drop the column `levelId` on the `lecturer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `lecturer` DROP FOREIGN KEY `Lecturer_levelId_fkey`;

-- DropIndex
DROP INDEX `Lecturer_levelId_fkey` ON `lecturer`;

-- AlterTable
ALTER TABLE `course` ADD COLUMN `semesterId` INTEGER NULL;

-- AlterTable
ALTER TABLE `lecturer` DROP COLUMN `levelId`;

-- AlterTable
ALTER TABLE `student` ADD COLUMN `semesterId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Academicsession` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `startdate` DATETIME(3) NOT NULL,
    `enddate` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Academicsession_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Semesters` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `semester` ENUM('first_semester', 'second_semester') NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `sessionId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_semesterId_fkey` FOREIGN KEY (`semesterId`) REFERENCES `Semesters`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_semesterId_fkey` FOREIGN KEY (`semesterId`) REFERENCES `Semesters`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Semesters` ADD CONSTRAINT `Semesters_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `Academicsession`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
