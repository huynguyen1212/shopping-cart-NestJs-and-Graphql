import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderInput } from '../dto/create-order.input';
import { UpdateOrderInput } from '../dto/update-order.input';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  create(createOrderInput: CreateOrderInput) {
    const order = {
      ...createOrderInput,
    };

    this.orderRepo.insert(order);
    return order;
  }

  findAll() {
    return this.orderRepo.find();
  }

  findOneById(id: string) {
    return this.orderRepo.findOne({ where: { id } });
  }

  // async update(input: UpdateOrderInput) {
  //   const { id, ...rest } = input;

  //   const order = await this.findOneById(id);

  //   const newPeoduct = Object.assign(product, rest);

  //   await this.orderRepo.save(newPeoduct);

  //   return newPeoduct;
  // }

  async remove(id: string): Promise<Order> {
    const order = await this.findOneById(id);

    await this.orderRepo.delete(id);

    return order;
  }
}
