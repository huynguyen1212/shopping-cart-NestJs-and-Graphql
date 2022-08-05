import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartType } from 'src/common/constants/cart.enum';
import { UpdateOrderInput } from 'src/module/orders/dto/update-order.input';
import { ProductsService } from 'src/module/products/service/products.service';
import { User } from 'src/module/users/entities/user.entity';
import { Repository } from 'typeorm';
import { AddProductToCartInput } from '../dto/add-product-to-cart.input';
import { RemoveProductInCartInput } from '../dto/remove-prodyct-in-cart.input';
import { UpdateCartInput } from '../dto/update-cart.input';
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
      // .andWhere('c.status = :s', {s: })
      .getOne();

    if (duplicate) {
      const price = Number(
        (addProductToCartInput.total + duplicate?.total) * product?.price,
      );

      const cart = {
        ...duplicate,
        total: addProductToCartInput.total + duplicate?.total,
        price: price,
      };

      this.cartRepo.save(cart);
      return cart;
    } else {
      const cart = {
        total: addProductToCartInput?.total,
        price: Number(addProductToCartInput.total * product?.price),
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
      price: Number((duplicate.total - 1) * duplicate.product.price),
    };

    this.cartRepo.save(cart);
    return cart;
  }

  async findAll(user: User, status?: CartType) {
    if (status && status === CartType.PICK) {
      const cart = await this.cartRepo
        .createQueryBuilder('c')
        .andWhere('c.user.id = :u', { u: user.id })
        .andWhere('c.status = :s', { s: status })
        .getMany();

      return cart;
    } else {
      const cart = await this.cartRepo
        .createQueryBuilder('c')
        .andWhere('c.user.id = :u', { u: user.id })
        .getMany();

      return cart;
    }
  }

  async sum(user: User) {
    const sum = await this.cartRepo
      .createQueryBuilder('c')
      .andWhere('c.user.id = :u', { u: user.id })
      .andWhere('c.status = :s', { s: CartType.PICK })
      .addSelect('SUM(c.price)', 'sum')
      .groupBy('c.id')
      .getRawOne();

    return sum.sum;
  }

  async findOneById(id: string) {
    return this.cartRepo.findOne({ where: { id } });
  }

  async update(input: UpdateCartInput) {
    const { id, ...rest } = input;

    const cart = await this.findOneById(id);

    const newCart = Object.assign(cart, rest);

    await this.cartRepo.save(newCart);

    return newCart;
  }

  async removeOneTypeProductInCart(id: string) {
    const cart = await this.findOneById(id);
    await this.cartRepo.delete(id);

    return cart;
  }

  async removeAllCart(user: User) {
    this.cartRepo
      .createQueryBuilder('c')
      .delete()
      .where('c.user.id = :u', { u: user.id });

    throw new Error('Delete success');
  }
}
