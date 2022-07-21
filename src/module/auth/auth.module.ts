import { Module } from '@nestjs/common';
import { UsersService } from '../users/service/users.service';
import { AuthResolver } from './resolver/auth.resolver';
import { AuthService } from './service/auth.service';

@Module({
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
