import { HttpException } from '@nestjs/common';
import { CodeType } from 'src/common/constants/code-type.enum';

export class AppError extends HttpException {
  constructor(public code: CodeType, public data?: Record<string, unknown>) {
    super('AppError', null);
  }
}
