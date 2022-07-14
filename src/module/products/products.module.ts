import { Module } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsResolver } from './resolver/products.resolver';
import { ProductsService } from './service/products.service';

@Module({
  providers: [ProductsResolver, ProductsService],
  imports: [TypeOrmModule.forFeature([Product])],
})
export class ProductsModule {}
