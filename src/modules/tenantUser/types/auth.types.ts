import {
  PrismaClient as TenantClient,
  Prisma as TenantPrisma,
} from '../../../../prisma/generated/tenant-client';

export const tenantPrisma = new TenantClient();

// Define the type for the payload
export type TenantUserInput = TenantPrisma.tenantUserCreateInput;
