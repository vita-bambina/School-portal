/*
  Warnings:

  - The values [MALE,FEMALE] on the enum `Enrollment_gender` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `enrollment` MODIFY `gender` ENUM('Male', 'Female') NULL;
