import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/service/users.service';
import { LocalStrategy } from './local.strategy';
import { AuthResolver } from './resolver/auth.resolver';
import { AuthService } from './service/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule],
  providers: [AuthService, AuthResolver, UsersService, LocalStrategy],
})
export class AuthModule {}
