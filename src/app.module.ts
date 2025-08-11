import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { BookModule } from './modules/book/book.module';
import { DynamicPrismaService } from './prisma/dynamic-prisma.service';
import { TenantUserModule } from './modules/tenantUser/tenantUser.module';
import { TenantModule } from './modules/tenant/tenant.module';

@Module({
  imports: [ConfigModule.forRoot(), TenantModule, BookModule, TenantUserModule],
  providers: [PrismaService, DynamicPrismaService],
})
export class AppModule {}
