/*
  Warnings:

  - You are about to drop the column `tenantId` on the `tenant` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `tenant_tenantId_key` ON `tenant`;

-- AlterTable
ALTER TABLE `tenant` DROP COLUMN `tenantId`;
