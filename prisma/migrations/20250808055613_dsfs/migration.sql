/*
  Warnings:

  - The primary key for the `tenant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `tenant` table. All the data in the column will be lost.
  - You are about to drop the column `dbHost` on the `tenant` table. All the data in the column will be lost.
  - You are about to drop the column `dbName` on the `tenant` table. All the data in the column will be lost.
  - You are about to drop the column `dbPassword` on the `tenant` table. All the data in the column will be lost.
  - You are about to drop the column `dbUser` on the `tenant` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `tenant` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - A unique constraint covering the columns `[email]` on the table `tenant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tenantId]` on the table `tenant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenantId` to the `tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tenant` DROP PRIMARY KEY,
    DROP COLUMN `createdAt`,
    DROP COLUMN `dbHost`,
    DROP COLUMN `dbName`,
    DROP COLUMN `dbPassword`,
    DROP COLUMN `dbUser`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `roleId` VARCHAR(191) NOT NULL,
    ADD COLUMN `tenantId` VARCHAR(191) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` ADD COLUMN `roleId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `tenantDb` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `dbName` VARCHAR(191) NOT NULL,
    `dbHost` VARCHAR(191) NOT NULL,
    `dbUser` VARCHAR(191) NOT NULL,
    `dbPassword` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `tenant_email_key` ON `tenant`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `tenant_tenantId_key` ON `tenant`(`tenantId`);
