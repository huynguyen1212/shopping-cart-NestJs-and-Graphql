import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductResolver } from './resolvers/product.resolver';

@Module({
  providers: [ProductResolver],
  imports: [TypeOrmModule.forFeature([ProductEntity])],
})
export class ProductModule {}
