/*
  Warnings:

  - Made the column `standard_rate` on table `utilitycompany` required. This step will fail if there are existing NULL values in that column.
  - Made the column `off_peak_rate` on table `utilitycompany` required. This step will fail if there are existing NULL values in that column.
  - Made the column `peak_rate` on table `utilitycompany` required. This step will fail if there are existing NULL values in that column.
  - Made the column `intermediate_rate` on table `utilitycompany` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `utilitycompany` MODIFY `standard_rate` INTEGER NOT NULL,
    MODIFY `off_peak_rate` INTEGER NOT NULL,
    MODIFY `peak_rate` INTEGER NOT NULL,
    MODIFY `intermediate_rate` INTEGER NOT NULL;
