import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { CodeType } from 'src/common/constants/code-type.enum';
import { IS_PUBLIC_KEY } from 'src/decorators/jwt.decorators';
import { AppError } from 'src/exceptions/app-error';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    await super.canActivate(context);
    const user = await this.getRequest(context).user;

    if (!user) {
      throw new AppError(CodeType.UNAUTHORIZED);
    }

    return true;
  }
}
