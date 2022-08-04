import { Module } from '@nestjs/common';
import { Cart } from './entities/cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartsResolver } from './resolver/carts.resolver';
import { CartsService } from './service/carts.service';
import { Product } from '../products/entities/product.entity';
import { ProductsService } from '../products/service/products.service';
import { CategoriesService } from '../categories/service/categories.service';
import { Category } from '../categories/entities/category.entity';

@Module({
  providers: [CartsResolver, CartsService, ProductsService, CategoriesService],
  imports: [TypeOrmModule.forFeature([Cart, Product, Category])],
})
export class CartsModule {}
