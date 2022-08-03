import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/module/products/service/products.service';
import { User } from 'src/module/users/entities/user.entity';
import { Repository } from 'typeorm';
import { AddProductToCartInput } from '../dto/add-product-to-cart.input';
import { RemoveProductInCartInput } from '../dto/remove-prodyct-in-cart.input';
import { Cart } from '../entities/cart.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepo: Repository<Cart>,
    private readonly productsService: ProductsService,
  ) {}

  async addProductToCart(
    addProductToCartInput: AddProductToCartInput,
    user: User,
  ) {
    //check product
    const product = await this.productsService.findOneById(
      addProductToCartInput.productId,
    );

    if (!product) {
      throw new Error('Product not found');
    }

    //check duplicate
    const duplicate = await this.cartRepo
      .createQueryBuilder('c')
      .andWhere('c.product.id = :pro', { pro: product.id })
      .andWhere('c.user.id = :u', { u: user.id })
      .getOne();

    if (duplicate) {
      const cart = {
        ...duplicate,
        total: addProductToCartInput.total + duplicate.total,
      };

      this.cartRepo.save(cart);
      return cart;
    } else {
      const cart = {
        total: addProductToCartInput.total,
        user,
        product,
      };

      this.cartRepo.save(cart);

      return cart;
    }
  }

  async removeProductInCart(
    removeProductInCart: RemoveProductInCartInput,
    user: User,
  ) {
    //check product
    const product = await this.productsService.findOneById(
      removeProductInCart.productId,
    );

    if (!product) {
      throw new Error('Product not found');
    }

    //check duplicate
    const duplicate = await this.cartRepo
      .createQueryBuilder('c')
      .andWhere('c.product.id = :pro', { pro: product.id })
      .andWhere('c.user.id = :u', { u: user.id })
      .getOne();

    const cart = {
      ...duplicate,
      total: duplicate.total - 1,
    };

    this.cartRepo.save(cart);
    return cart;
  }

  async findAll(user: User) {
    const cart = await this.cartRepo
      .createQueryBuilder('c')
      .andWhere('c.user.id = :u', { u: user.id })
      .getMany();

    console.log('cart: ', cart);

    return cart;
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
