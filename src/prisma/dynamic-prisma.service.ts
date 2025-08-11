import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../../prisma/generated/tenant-client';

@Injectable()
export class DynamicPrismaService implements OnModuleDestroy {
  private clients: Map<string, PrismaClient> = new Map();

  async getPrismaForDb(dbName: string) {
    // if (this.clients.has(dbName)) return this.clients.get(dbName)!;

    const url = `mysql://root:password123@localhost:3306/${dbName}`;
    const client = new PrismaClient({
      datasources: {
        db: { url },
      },
    });

    await client.$connect();
    this.clients.set(dbName, client);

    return client;
  }

  async onModuleDestroy() {
    for (const client of this.clients.values()) {
      await client.$disconnect();
    }
  }
}
