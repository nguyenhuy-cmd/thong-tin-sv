import { SetMetadata } from '@nestjs/common';
import { Role } from '../../users/entities/user.entity.js';

export const ROLES_KEY = 'roles';

// Dùng: @Roles(Role.Admin) -> chỉ admin được vào route này
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
