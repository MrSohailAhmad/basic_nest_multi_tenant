import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { DynamicPrismaService } from './dynamic-prisma.service';
import { MasterPrismaService } from './master-prisma.service';

@Global() // Optional: makes it globally available without importing
@Module({
  providers: [PrismaService, DynamicPrismaService, MasterPrismaService],
  exports: [PrismaService, DynamicPrismaService, MasterPrismaService], // 👈 MUST export this
})
export class PrismaModule {}
