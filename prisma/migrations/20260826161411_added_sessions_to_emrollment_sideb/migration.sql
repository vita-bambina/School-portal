-- AlterTable
ALTER TABLE `enrollment` ADD COLUMN `sessionId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Enrollment` ADD CONSTRAINT `Enrollment_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `Academicsession`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
