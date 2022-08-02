import { Module } from '@nestjs/common';
import { Cart } from './entities/cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartsResolver } from './resolver/carts.resolver';
import { CartsService } from './service/carts.service';
import { Product } from '../products/entities/product.entity';
import { ProductsService } from '../products/service/products.service';

@Module({
  providers: [CartsResolver, CartsService, ProductsService],
  imports: [TypeOrmModule.forFeature([Cart, Product])],
})
export class CartsModule {}
