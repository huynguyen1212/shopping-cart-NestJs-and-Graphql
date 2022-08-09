import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirebaseAuthGuard } from 'src/firebase/firebase-auth.guard';
import { FirebaseAuthStrategy } from 'src/firebase/firebase-auth.strategy';
import { RolesGuard } from 'src/guards/roles.guard';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/service/users.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { AuthResolver } from './resolver/auth.resolver';
import { AuthService } from './service/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      signOptions: { expiresIn: '5000s' },
      secret: 'hide-me', //process.env.JWT_SECRET
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    UsersService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // FirebaseAuthStrategy,
    // {
    //   provide: APP_GUARD,
    //   useClass: FirebaseAuthGuard,
    // },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AuthModule {}
