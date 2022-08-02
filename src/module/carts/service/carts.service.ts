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
    private readonly cartRepo: Repository<Cart>,
  ) {}

  create(createOrderInput: CreateCartInput, userId: any) {
    const cart = {
      ...createOrderInput,
      userId,
    };

    console.log(cart);

    this.cartRepo.insert(cart);
    return cart;
  }

  findAll() {
    return this.cartRepo.find();
  }

  findOneById(id: string) {
    return this.cartRepo.findOne({ where: { id } });
  }

  // async update(input: UpdateOrderInput) {
  //   const { id, ...rest } = input;

  //   const cart = await this.findOneById(id);

  //   const newPeoduct = Object.assign(product, rest);

  //   await this.cartRepo.save(newPeoduct);

  //   return newPeoduct;
  // }

  async remove(id: string): Promise<Cart> {
    const cart = await this.findOneById(id);

    await this.cartRepo.delete(id);

    return cart;
  }
}
