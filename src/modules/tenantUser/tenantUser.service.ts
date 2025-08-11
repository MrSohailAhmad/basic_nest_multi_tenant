// auth.service.ts
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import HttpStatus from 'http-status-codes';
import { DynamicPrismaService } from 'src/prisma/dynamic-prisma.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { successResponse } from 'src/common/utils/globalResponse.utils';
import { AppError, createAccessToken } from 'src/common/utils/token.utils';
import { LoginDto, RegisterUserDto } from './dto/auth.dto';
import { AuthEnum } from './enum/auth.enum';
import { TenantUserCreateInput } from './types/auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly dynamicPrisma: DynamicPrismaService,
    private readonly prismaService: PrismaService,
  ) {}

  async getClient(tenantId: string) {
    return this.dynamicPrisma.getPrismaForDb(tenantId);
  }

  async login(body: LoginDto, tenantId: string) {
    const { email, password } = body;
    // 📦 Step 1: (Optional) fetch user data from tenant DB
    const tenantPrisma = await this.dynamicPrisma.getPrismaForDb(tenantId);
    const user = await tenantPrisma.tenantUser.findUnique({
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

  async registerUser(body: RegisterUserDto, tenantId: string) {
    const { email, password } = body;

    // 📦 Step 1: (Optional) fetch user data from tenant DB

    const prisma = await this.getClient(tenantId);

    const user = await prisma.tenantUser.findUnique({
      where: { email: String(email) },
    });

    if (user) {
      throw new NotFoundException('User Already exist with this email');
    }

    body.password = await bcrypt.hash(password, 12);

    const createUser = await prisma.tenantUser.create({
      data: { ...body, tenantId } as TenantUserCreateInput,
    });
    const updateRecord = this.publicProfile(createUser);

    return successResponse({
      statusCode: 201,
      message: 'User Registered SuccessFull',
      payload: {
        user: updateRecord,
      },
    });
  }

  publicProfile(user) {
    const record = { ...user };
    if (!record || !record.id)
      throw new AppError(AuthEnum.USER_NOT_FOUND, HttpStatus.NOT_FOUND);

    if (record.password) delete record.password;
    if (record.remember_token) delete record.remember_token;

    return record;
  }
}
