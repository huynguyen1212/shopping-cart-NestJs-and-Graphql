import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../carts/entities/cart.entity';
import { CartsService } from '../carts/service/carts.service';
import { Category } from '../categories/entities/category.entity';
import { CategoriesService } from '../categories/service/categories.service';
import { Product } from '../products/entities/product.entity';
import { ProductsService } from '../products/service/products.service';
import { Order } from './entities/order.entity';
import { OrdersResolver } from './resolver/orders.resolver';
import { OrdersService } from './service/orders.service';

@Module({
  providers: [
    OrdersResolver,
    OrdersService,
    CartsService,
    ProductsService,
    CategoriesService,
  ],
  imports: [TypeOrmModule.forFeature([Order, Cart, Product, Category])],
})
export class OrdersModule {}
