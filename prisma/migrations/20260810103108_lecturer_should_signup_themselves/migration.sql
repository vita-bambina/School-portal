-- DropForeignKey
ALTER TABLE `lecturer` DROP FOREIGN KEY `Lecturer_facultyId_fkey`;

-- DropForeignKey
ALTER TABLE `lecturer` DROP FOREIGN KEY `Lecturer_levelId_fkey`;

-- DropIndex
DROP INDEX `Lecturer_facultyId_fkey` ON `lecturer`;

-- DropIndex
DROP INDEX `Lecturer_levelId_fkey` ON `lecturer`;

-- AlterTable
ALTER TABLE `lecturer` MODIFY `levelId` INTEGER NULL,
    MODIFY `facultyId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Lecturer` ADD CONSTRAINT `Lecturer_levelId_fkey` FOREIGN KEY (`levelId`) REFERENCES `Level`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lecturer` ADD CONSTRAINT `Lecturer_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `Faculty`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
