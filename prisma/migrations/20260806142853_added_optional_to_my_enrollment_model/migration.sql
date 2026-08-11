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
ALTER TABLE `enrollment` ADD COLUMN `currentStep` INTEGER NOT NULL DEFAULT 1,
    MODIFY `firstName` VARCHAR(191) NULL,
    MODIFY `lastName` VARCHAR(191) NULL,
    MODIFY `gender` ENUM('MALE', 'FEMALE') NULL,
    MODIFY `dateOfBirth` DATETIME(3) NULL,
    MODIFY `phone` VARCHAR(191) NULL,
    MODIFY `address` VARCHAR(191) NULL,
    MODIFY `departmentId` INTEGER NULL,
    MODIFY `userId` INTEGER NULL,
    MODIFY `facultyId` INTEGER NULL,
    MODIFY `jambRegistrationNumber` VARCHAR(191) NULL,
    MODIFY `jambScore` INTEGER NULL,
    MODIFY `waecAggregate` INTEGER NULL,
    MODIFY `ninNumber` VARCHAR(191) NULL,
    MODIFY `birthCertificate` VARCHAR(191) NULL,
    MODIFY `passportPhoto` VARCHAR(191) NULL,
    MODIFY `country` VARCHAR(191) NULL,
    MODIFY `stateOfOrigin` VARCHAR(191) NULL,
    MODIFY `Lga` VARCHAR(191) NULL,
    MODIFY `CurrentState` VARCHAR(191) NULL,
    MODIFY `CurrentstateLGA` VARCHAR(191) NULL,
    MODIFY `status` ENUM('PENDING', 'ADMITTED', 'REJECTED', 'IN_PROGRESS') NOT NULL DEFAULT 'PENDING',
    MODIFY `referenceNumber` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Enrollment` ADD CONSTRAINT `Enrollment_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enrollment` ADD CONSTRAINT `Enrollment_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `Faculty`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enrollment` ADD CONSTRAINT `Enrollment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
