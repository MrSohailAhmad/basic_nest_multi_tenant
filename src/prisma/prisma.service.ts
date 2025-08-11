import { Injectable, OnModuleInit } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';
import { DynamicPrismaService } from './dynamic-prisma.service';
import { MasterPrismaService } from './master-prisma.service';
import { PrismaClient } from 'generated/prisma';

const execAsync = promisify(exec);

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(
    private readonly dynamicPrismaService: DynamicPrismaService,
    private readonly masterPrisma: MasterPrismaService,
  ) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async createTenantDatabase(dbName: string) {
    await this.$executeRawUnsafe(`CREATE DATABASE \`${dbName}\``);
  }

  async generatePrismaClient(dbName: string) {
    const url = `mysql://root:password123@localhost:3306/${dbName}`;
    // Inject URL dynamically and regenerate Prisma client
    process.env.DATABASE_URL = url;

    // await execAsync(`npx prisma db push --schema=prisma/tenant-schema.prisma`);
    this.pushTenantDb();

    return this.dynamicPrismaService.getPrismaForDb(dbName);
  }

  async getMasterClient() {
    return this.masterPrisma;
  }

  async enableShutdownHooks() {
    await this.$disconnect();
  }

  async pushTenantDb() {
    try {
      await execAsync(
        `npx prisma migrate dev --name init --schema=prisma/tenant-schema.prisma`,
      );

      return { message: 'Tenant DB pushed successfully ✅' };
    } catch (error) {
      throw new Error(`Error pushing Tenant DB ❌: ${error}`);
    }
  }
}
