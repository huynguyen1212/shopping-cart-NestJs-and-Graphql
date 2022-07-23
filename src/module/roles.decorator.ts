import { SetMetadata } from '@nestjs/common';
import { RoleType } from './users/user.enum.';

export const Roles = (...roles: RoleType[]) => SetMetadata('roles', roles);
