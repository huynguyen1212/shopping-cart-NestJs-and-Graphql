import { Module } from '@nestjs/common';
import { Cart } from './entities/cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartsResolver } from './resolver/carts.resolver';
import { CartsService } from './service/carts.service';

@Module({
  providers: [CartsResolver, CartsService],
  imports: [TypeOrmModule.forFeature([Cart])],
})
export class CartsModule {}
