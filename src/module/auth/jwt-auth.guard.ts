import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { CodeType } from 'src/common/constants/code-type.enum';
import { AppError } from 'src/exceptions/app-error';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const user = await this.getRequest(context).user;

    if (!user) {
      throw new AppError(CodeType.UNAUTHORIZED);
    }

    return true;
  }
}
