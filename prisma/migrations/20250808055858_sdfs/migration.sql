/*
  Warnings:

  - You are about to alter the column `roleId` on the `tenant` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `roleId` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `tenant` MODIFY `roleId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `roleId` INTEGER NOT NULL;
