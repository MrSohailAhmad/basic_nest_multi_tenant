import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // no roles required
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user) return false;

    // ✅ Find user by ID
    const saveUser = await this.prisma.user.findFirst({
      where: { id: user.id },
    });
    if (!saveUser) return false;

    // ✅ Find role by ID
    const role = await this.prisma.roles.findFirst({
      where: { id: saveUser.roleId },
    });

    // ✅ Compare role name with required roles
    if (!role || !requiredRoles.includes(role.name)) {
      throw new ForbiddenException('Access denied');
    }

    return true;
  }
}
