/*
  Warnings:

  - Added the required column `CurrentState` to the `Enrollment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CurrentstateLGA` to the `Enrollment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Lga` to the `Enrollment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Enrollment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stateOfOrigin` to the `Enrollment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "CurrentState" TEXT NOT NULL,
ADD COLUMN     "CurrentstateLGA" TEXT NOT NULL,
ADD COLUMN     "Lga" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "stateOfOrigin" TEXT NOT NULL;
