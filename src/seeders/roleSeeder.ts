import { PrismaClient } from 'generated/prisma';

const prisma = new PrismaClient();

const roles = [
  {
    id: 1,
    name: 'Owner',
    description: 'Has full control over the tenant',
  },
  {
    id: 2,
    name: 'Tenant',
    description: 'Represents the tenant account',
  },
  {
    id: 3,
    name: 'Tenant_Admin',
    description: 'Manages users under the tenant',
  },
  {
    id: 4,
    name: 'Tenant_User',
    description: 'Regular user under the tenant with limited permissions',
  },
];

export const seedRoles = async () => {
  try {
    // Delete existing roles
    await prisma.roles.deleteMany();

    // Insert new roles
    const createdRoles = await prisma.roles.createMany({
      data: roles,
    });
    console.log('Roles seeded successfully:', createdRoles);

    return createdRoles;
  } catch (error) {
    console.error('Error seeding roles:', error);
    throw error;
  }
};
