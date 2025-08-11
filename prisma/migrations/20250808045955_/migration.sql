/*
  Warnings:

  - You are about to drop the column `tenantDb` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `book` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[tenantId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `User_tenantDb_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `tenantDb`,
    ADD COLUMN `password` VARCHAR(191) NULL,
    ADD COLUMN `tenantId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `book`;

-- CreateIndex
CREATE UNIQUE INDEX `User_tenantId_key` ON `User`(`tenantId`);
