import { Module } from '@nestjs/common';

import { DynamicPrismaService } from 'src/prisma/dynamic-prisma.service';
import { AuthController } from './tenantUser.controller';
import { AuthService } from './tenantUser.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, DynamicPrismaService],
  exports: [DynamicPrismaService],
})
export class TenantUserModule {}
