/*
  Warnings:

  - You are about to drop the column `departmentId` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `levelId` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `studentNumber` on the `student` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `Student_departmentId_fkey`;

-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `Student_levelId_fkey`;

-- DropIndex
DROP INDEX `Student_departmentId_fkey` ON `student`;

-- DropIndex
DROP INDEX `Student_levelId_fkey` ON `student`;

-- DropIndex
DROP INDEX `Student_studentNumber_key` ON `student`;

-- AlterTable
ALTER TABLE `student` DROP COLUMN `departmentId`,
    DROP COLUMN `levelId`,
    DROP COLUMN `studentNumber`;

-- CreateTable
CREATE TABLE `Enrollment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `jambScore` INTEGER NOT NULL,
    `waecAggregate` INTEGER NOT NULL,
    `ninNumber` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Enrollment_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Enrollment` ADD CONSTRAINT `Enrollment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
