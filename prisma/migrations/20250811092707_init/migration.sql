/*
  Warnings:

  - Made the column `roleId` on table `TenantUser` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `TenantUser` MODIFY `roleId` INTEGER NOT NULL;
