import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { OrderResolver } from './resolvers/order.resolver';

@Module({
  providers: [OrderResolver],
  imports: [TypeOrmModule.forFeature([OrderEntity])],
})
export class OrderModule {}
