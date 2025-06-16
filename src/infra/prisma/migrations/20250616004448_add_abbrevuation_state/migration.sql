/*
  Warnings:

  - Added the required column `abbreviation` to the `State` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `state` ADD COLUMN `abbreviation` VARCHAR(191) NOT NULL;
