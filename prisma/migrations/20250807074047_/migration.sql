/*
  Warnings:

  - You are about to drop the `book` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[tenantDb]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropTable
DROP TABLE `book`;

-- CreateIndex
CREATE UNIQUE INDEX `User_tenantDb_key` ON `User`(`tenantDb`);
