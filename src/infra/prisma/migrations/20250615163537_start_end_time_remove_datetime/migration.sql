/*
  Warnings:

  - You are about to alter the column `energy_consumed` on the `reading` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Int`.
  - You are about to alter the column `current_value` on the `reading` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Int`.
  - You are about to alter the column `voltage_value` on the `reading` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Int`.

*/
-- AlterTable
ALTER TABLE `reading` MODIFY `energy_consumed` INTEGER NOT NULL,
    MODIFY `current_value` INTEGER NOT NULL,
    MODIFY `voltage_value` INTEGER NOT NULL;
