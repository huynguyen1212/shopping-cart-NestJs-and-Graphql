import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/module/products/entities/product.entity';
import { ProductsService } from 'src/module/products/service/products.service';
import { User } from 'src/module/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCartInput } from '../dto/create-cart.input';
import { UpdateCartInput } from '../dto/update-cart.input';
import { Cart } from '../entities/cart.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepo: Repository<Cart>,
    private readonly productsService: ProductsService,
  ) {}

  async create(createOrderInput: CreateCartInput, user: User) {
    const p = await this.productsService.findOneById(
      createOrderInput.productId,
    );

    if (!p) {
      throw new Error('Product not found');
    }

    const cart = {
      total: createOrderInput.total,
      user,
      product: p,
    };

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
