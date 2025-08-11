-- AlterTable
ALTER TABLE `roles` MODIFY `deleted` BOOLEAN NULL;

-- AlterTable
ALTER TABLE `tenant` MODIFY `deleted` BOOLEAN NULL;

-- AlterTable
ALTER TABLE `tenantDb` MODIFY `deleted` BOOLEAN NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `deleted` BOOLEAN NULL;
