-- DropForeignKey
ALTER TABLE `enrollment` DROP FOREIGN KEY `Enrollment_departmentId_fkey`;

-- DropForeignKey
ALTER TABLE `enrollment` DROP FOREIGN KEY `Enrollment_facultyId_fkey`;

-- DropForeignKey
ALTER TABLE `enrollment` DROP FOREIGN KEY `Enrollment_userId_fkey`;

-- DropIndex
DROP INDEX `Enrollment_departmentId_fkey` ON `enrollment`;

-- DropIndex
DROP INDEX `Enrollment_facultyId_fkey` ON `enrollment`;

-- AlterTable
ALTER TABLE `enrollment` MODIFY `departmentId` INTEGER NULL,
    MODIFY `userId` INTEGER NULL,
    MODIFY `facultyId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Enrollment` ADD CONSTRAINT `Enrollment_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enrollment` ADD CONSTRAINT `Enrollment_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `Faculty`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enrollment` ADD CONSTRAINT `Enrollment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
