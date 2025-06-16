/*
  Warnings:

  - You are about to alter the column `cpf_cnpj` on the `customer` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(14)`.
  - You are about to alter the column `mobile_phone` on the `customer` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to alter the column `firmware_version` on the `hardware` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to alter the column `hardware_version` on the `hardware` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - The `end_first_intermediate_time` column on the `utilitycompany` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `end_second_intermediate_time` column on the `utilitycompany` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `end_peak_time` column on the `utilitycompany` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `start_first_intermediate_time` column on the `utilitycompany` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `start_second_intermediate_time` column on the `utilitycompany` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `start_peak_time` column on the `utilitycompany` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `customer` MODIFY `cpf_cnpj` VARCHAR(14) NOT NULL,
    MODIFY `mobile_phone` VARCHAR(20) NULL;

-- AlterTable
ALTER TABLE `hardware` MODIFY `firmware_version` VARCHAR(20) NOT NULL,
    MODIFY `hardware_version` VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE `utilitycompany` DROP COLUMN `end_first_intermediate_time`,
    ADD COLUMN `end_first_intermediate_time` INTEGER NULL,
    DROP COLUMN `end_second_intermediate_time`,
    ADD COLUMN `end_second_intermediate_time` INTEGER NULL,
    DROP COLUMN `end_peak_time`,
    ADD COLUMN `end_peak_time` INTEGER NULL,
    DROP COLUMN `start_first_intermediate_time`,
    ADD COLUMN `start_first_intermediate_time` INTEGER NULL,
    DROP COLUMN `start_second_intermediate_time`,
    ADD COLUMN `start_second_intermediate_time` INTEGER NULL,
    DROP COLUMN `start_peak_time`,
    ADD COLUMN `start_peak_time` INTEGER NULL;
