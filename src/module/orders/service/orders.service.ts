import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartType } from 'src/common/constants/cart.enum';
import { CartsService } from 'src/module/carts/service/carts.service';
import { User } from 'src/module/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateOrderInput } from '../dto/create-order.input';
import { UpdateOrderInput } from '../dto/update-order.input';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    private readonly cartsService: CartsService,
  ) {}

  async create(createOrderInput: CreateOrderInput, user: User) {
    const order = new Order();
    const cart = await this.cartsService.findAll(user, CartType.PICK);
    const sum = await this.cartsService.sum(user);
    if (sum === 0) {
      throw new Error('Cart is empty!');
    }

    order.description = createOrderInput.description;
    order.cart = cart;
    order.totaPrice = sum;
    order.user = user;

    this.orderRepo.save(order).then(() => {
      for (let i = 0; i < cart.length; i++) {
        const updateCartInput = {
          id: cart[i].id,
          status: CartType.SALED,
        };
        this.cartsService.update(updateCartInput);
      }
    });
    return order;
  }

  async findAll() {
    return this.orderRepo.find();
  }

  async findOneById(id: string) {
    return this.orderRepo.findOne({ where: { id } });
  }

  async update(input: UpdateOrderInput) {
    const { id, ...rest } = input;

    const order = await this.findOneById(id);

    const newOrder = Object.assign(order, rest);

    await this.orderRepo.save(newOrder);

    return newOrder;
  }

  // async remove(id: string): Promise<Order> {
  //   const order = await this.findOneById(id);

  //   await this.orderRepo.delete(id);

  //   return order;
  // }
}
