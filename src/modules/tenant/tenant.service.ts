import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { CreateUserDto, loginTenantDto, UpdateUserDto } from './dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { createAccessToken } from 'src/common/utils/token.utils';
import { successResponse } from 'src/common/utils/globalResponse.utils';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async register(createUserDto: CreateUserDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existing) throw new BadRequestException('User already exists');

    const tenantDbName = `tenant_db_${Date.now()}`;

    // 1. Create the tenant DB
    await this.prisma.createTenantDatabase(tenantDbName);
    // 2. Push tenant schema
    await this.prisma.generatePrismaClient(tenantDbName);

    // await seedTenantRoles(tenantDbName); // TODO something went wrong when creating tenant roles
    // 3. Store user in master DB
    createUserDto.password = await bcrypt.hash(createUserDto.password, 12);
    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        tenantId: tenantDbName,
      },
    });

    return user;
  }

  async login(body: loginTenantDto) {
    const { email, password } = body;
    // 📦 Step 1: (Optional) fetch user data from tenant DB
    // const tenantPrisma = await this.dynamicPrisma.getPrismaForDb(tenantId);
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // ✅ Step 2: Create access token
    const accessToken = createAccessToken({
      id: user.id,
      tenantId: user.tenantId,
      email: user.email,
    });

    return successResponse({
      statusCode: 200,
      message: 'login SuccessFull',
      payload: {
        accessToken: accessToken,
        user: user,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateUserDto) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 12);
    }
    return this.prisma.user.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
