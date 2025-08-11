import { PrismaClient } from '../../prisma/generated/tenant-client';

const prisma = new PrismaClient();
const tenantRoles = [
  {
    id: 1,
    name: 'Tenant_Admin',
    description: 'Manages users under the tenant',
  },
  {
    id: 2,
    name: 'Tenant_User',
    description: 'Regular user under the tenant with limited permissions',
  },
];

export const seedTenantRoles = async (dbName: string) => {
  const url = `mysql://root:password123@localhost:3306/${dbName}`;
  // Inject URL dynamically and regenerate Prisma client
  process.env.DATABASE_URL = url;

  try {
    // Delete existing roles
    // await prisma.tenantRoles.deleteMany();

    // Insert new roles
    const createdRoles = await prisma.tenantRoles.createMany({
      data: tenantRoles,
    });
    console.log('Roles seeded successfully:', createdRoles);

    return createdRoles;
  } catch (error) {
    console.error('Error seeding roles:', error);
    throw error;
  }
};
