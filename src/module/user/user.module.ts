import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserResolver } from './resolvers/user.resolver';

@Module({
  providers: [UserResolver],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class UserModule {}
