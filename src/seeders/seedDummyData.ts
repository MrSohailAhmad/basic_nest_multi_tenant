import * as bcrypt from 'bcrypt';
import { PrismaClient } from 'generated/prisma';
import { CreateUserDto } from 'src/modules/tenant/dto/user.dto';
import { TenantUserInput } from './seederDataTypes';
import { DynamicPrismaService } from 'src/prisma/dynamic-prisma.service';
import { MasterPrismaService } from 'src/prisma/master-prisma.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/modules/tenant/tenant.service';

const prisma = new PrismaClient();

const tenant = {
  name: 'David Wilson',
  email: 'david@abc.com',
  password: 'hashed_password_owner',
  roleId: 1,
};

export const seedDummyData = async () => {
  try {
    const tenant = await seedTenant();
    const user = await seedUser();
    return {
      tenant,
      user,
    };
  } catch (error) {
    console.error('Error seeding:', error);
    throw error;
  }
};

const seedTenant = async () => {
  try {
    // Delete existing Tenant
    await prisma.tenant.deleteMany();

    // Insert new Tenant
    tenant.password = await bcrypt.hash(tenant.password, 12);

    const createdTenant = await prisma.tenant.create({
      data: tenant as TenantUserInput,
    });
    console.log('Tenant seeded successfully:', createdTenant);
    return createdTenant;
  } catch (error) {
    return error;
  }
};

const user: CreateUserDto = {
  name: 'David Wilson',
  email: 'david@xyz.com',
  password: 'hashed_password_tenant',
  roleId: 2,
};

const seedUser = async () => {
  try {
    // ✅ Check if user already exists by email
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (existingUser) {
      console.log(
        `User with email ${user.email} already exists. Skipping seed.`,
      );
      return existingUser; // return the existing one instead of creating
    }
    // Delete existing user
    // await prisma.user.deleteMany();

    // Insert new user
    user.password = await bcrypt.hash(user.password, 12);

    // ✅ Create PrismaService and UserService manually
    const dynamicPrismaService = new DynamicPrismaService();
    const masterPrismaService = new MasterPrismaService();
    const prismaService = new PrismaService(
      dynamicPrismaService,
      masterPrismaService,
    );
    const userService = new UserService(prismaService);

    const createdUser = await userService.register(user);
    console.log('User seeded successfully:', createdUser);

    return createdUser;
  } catch (error) {
    return error;
  }
};
