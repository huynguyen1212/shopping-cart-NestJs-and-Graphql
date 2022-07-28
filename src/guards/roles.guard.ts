import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { RoleType } from 'src/common/constants/user.enum.';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { CodeType } from 'src/common/constants/code-type.enum';
import { AppError } from 'src/exceptions/app-error';
import { UsersService } from '../module/users/service/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private usersService: UsersService,
    private reflector: Reflector,
  ) {}

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<RoleType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    console.log('requiredRoles:', requiredRoles);

    if (!requiredRoles) {
      return true;
    }

    const user = this.getRequest(context).user;

    console.log('Guard get user:', user);

    // const roleUser = this.usersService
    //   .findOneById(user?.userId)
    //   .then((res) => res.role);

    // console.log('roleUser: ', roleUser);

    const hasRole = requiredRoles.some((role) => role === user?.role);
    console.log('hasRole:', hasRole);

    if (hasRole) {
      return true;
    }

    throw new AppError(CodeType.FORBIDDEN);
  }
}
