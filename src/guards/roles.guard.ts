import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { RoleType } from 'src/common/constants/user.enum.';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { CodeType } from 'src/common/constants/code-type.enum';
import { AppError } from 'src/exceptions/app-error';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<RoleType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const user = this.getRequest(context).user;
    const hasRole = requiredRoles.some((role) => role === user?.role);

    if (hasRole) {
      return true;
    }

    throw new AppError(CodeType.FORBIDDEN);
  }
}
