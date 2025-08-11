import {
  PrismaClient as TenantClient,
  Prisma as TenantPrisma,
} from '../../generated/prisma';

export const tenantPrisma = new TenantClient();

// Define the type for the payload
export type TenantUserInput = TenantPrisma.TenantCreateInput;
export type UserInput = TenantPrisma.UserCreateInput;
