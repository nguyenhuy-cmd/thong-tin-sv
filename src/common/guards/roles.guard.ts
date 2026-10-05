import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import type {} from 'express-session';
import { ROLES_KEY } from '../decorators/roles.decorator.js';
import { Role } from '../../users/entities/user.entity.js';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Lấy danh sách role yêu cầu từ @Roles (ưu tiên method, sau đó đến class)
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Route không gắn @Roles -> ai đăng nhập cũng vào được
    if (!requiredRoles || requiredRoles.length === 0) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const user = (request.session as any)?.user;

    // Role của user lưu trong session lúc đăng nhập
    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Bạn không có quyền thực hiện thao tác này');
    }
    return true;
  }
}
