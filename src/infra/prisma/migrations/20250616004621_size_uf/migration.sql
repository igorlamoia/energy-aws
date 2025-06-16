/*
  Warnings:

  - You are about to alter the column `abbreviation` on the `state` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(2)`.

*/
-- AlterTable
ALTER TABLE `state` MODIFY `abbreviation` VARCHAR(2) NOT NULL;
