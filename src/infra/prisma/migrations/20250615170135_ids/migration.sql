/*
  Warnings:

  - The primary key for the `customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_customer` on the `customer` table. All the data in the column will be lost.
  - The primary key for the `hardware` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_hardware` on the `hardware` table. All the data in the column will be lost.
  - The primary key for the `log` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_log` on the `log` table. All the data in the column will be lost.
  - The primary key for the `reading` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `date` on the `reading` table. All the data in the column will be lost.
  - You are about to drop the column `id_reading` on the `reading` table. All the data in the column will be lost.
  - The primary key for the `residence` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_residence` on the `residence` table. All the data in the column will be lost.
  - The primary key for the `state` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_state` on the `state` table. All the data in the column will be lost.
  - The primary key for the `utilitycompany` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_utility_company` on the `utilitycompany` table. All the data in the column will be lost.
  - Added the required column `id` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Hardware` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Reading` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Residence` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `State` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `UtilityCompany` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `hardware` DROP FOREIGN KEY `Hardware_id_residence_fkey`;

-- DropForeignKey
ALTER TABLE `reading` DROP FOREIGN KEY `Reading_id_hardware_fkey`;

-- DropForeignKey
ALTER TABLE `residence` DROP FOREIGN KEY `Residence_id_customer_fkey`;

-- DropForeignKey
ALTER TABLE `residence` DROP FOREIGN KEY `Residence_id_state_fkey`;

-- DropForeignKey
ALTER TABLE `residence` DROP FOREIGN KEY `Residence_id_utility_company_fkey`;

-- DropForeignKey
ALTER TABLE `utilitycompany` DROP FOREIGN KEY `UtilityCompany_id_state_fkey`;

-- DropIndex
DROP INDEX `Hardware_id_residence_fkey` ON `hardware`;

-- DropIndex
DROP INDEX `Reading_id_hardware_fkey` ON `reading`;

-- DropIndex
DROP INDEX `Residence_id_customer_fkey` ON `residence`;

-- DropIndex
DROP INDEX `Residence_id_state_fkey` ON `residence`;

-- DropIndex
DROP INDEX `Residence_id_utility_company_fkey` ON `residence`;

-- DropIndex
DROP INDEX `UtilityCompany_id_state_fkey` ON `utilitycompany`;

-- AlterTable
ALTER TABLE `customer` DROP PRIMARY KEY,
    DROP COLUMN `id_customer`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `hardware` DROP PRIMARY KEY,
    DROP COLUMN `id_hardware`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `log` DROP PRIMARY KEY,
    DROP COLUMN `id_log`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `reading` DROP PRIMARY KEY,
    DROP COLUMN `date`,
    DROP COLUMN `id_reading`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `residence` DROP PRIMARY KEY,
    DROP COLUMN `id_residence`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `state` DROP PRIMARY KEY,
    DROP COLUMN `id_state`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `utilitycompany` DROP PRIMARY KEY,
    DROP COLUMN `id_utility_company`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `UtilityCompany` ADD CONSTRAINT `UtilityCompany_id_state_fkey` FOREIGN KEY (`id_state`) REFERENCES `State`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Residence` ADD CONSTRAINT `Residence_id_state_fkey` FOREIGN KEY (`id_state`) REFERENCES `State`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Residence` ADD CONSTRAINT `Residence_id_utility_company_fkey` FOREIGN KEY (`id_utility_company`) REFERENCES `UtilityCompany`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Residence` ADD CONSTRAINT `Residence_id_customer_fkey` FOREIGN KEY (`id_customer`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hardware` ADD CONSTRAINT `Hardware_id_residence_fkey` FOREIGN KEY (`id_residence`) REFERENCES `Residence`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reading` ADD CONSTRAINT `Reading_id_hardware_fkey` FOREIGN KEY (`id_hardware`) REFERENCES `Hardware`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
