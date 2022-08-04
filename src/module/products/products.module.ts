import { Module } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsResolver } from './resolver/products.resolver';
import { ProductsService } from './service/products.service';
import { CategoriesService } from '../categories/service/categories.service';
import { Category } from '../categories/entities/category.entity';

@Module({
  providers: [ProductsResolver, ProductsService, CategoriesService],
  imports: [TypeOrmModule.forFeature([Product, Category])],
})
export class ProductsModule {}
