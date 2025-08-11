import { Module } from '@nestjs/common';
import { UserService } from './tenant.service';
import { UserController } from './tenant.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { MasterPrismaService } from 'src/prisma/master-prisma.service';
import { DynamicPrismaService } from 'src/prisma/dynamic-prisma.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    MasterPrismaService,
    DynamicPrismaService,
  ],
})
export class TenantModule {}
