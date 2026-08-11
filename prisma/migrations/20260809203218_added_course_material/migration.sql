-- CreateTable
CREATE TABLE `Coursematerial` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `file` VARCHAR(191) NOT NULL,
    `lecturerCourseId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Coursematerial` ADD CONSTRAINT `Coursematerial_lecturerCourseId_fkey` FOREIGN KEY (`lecturerCourseId`) REFERENCES `LecturerCourse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
