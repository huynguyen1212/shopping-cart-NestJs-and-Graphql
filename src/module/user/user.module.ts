import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserResolver } from './user.resolver';

@Module({
  providers: [UserResolver],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class UserModule {}
