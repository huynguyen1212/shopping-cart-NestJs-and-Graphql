import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCartInput } from '../dto/create-cart.input';
import { UpdateCartInput } from '../dto/update-cart.input';
import { Cart } from '../entities/cart.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private readonly orderRepo: Repository<Cart>,
  ) {}

  create(createOrderInput: CreateCartInput) {
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

  async remove(id: string): Promise<Cart> {
    const order = await this.findOneById(id);

    await this.orderRepo.delete(id);

    return order;
  }
}
