import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { CartResolver } from './resolvers/cart.resolver';

@Module({
  providers: [CartResolver],
  imports: [TypeOrmModule.forFeature([CartEntity])],
})
export class CartModule {}
