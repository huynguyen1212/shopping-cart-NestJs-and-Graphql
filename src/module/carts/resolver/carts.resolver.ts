import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreateCartInput } from '../dto/create-cart.input';
import { UpdateCartInput } from '../dto/update-cart.input';
import { Cart } from '../entities/cart.entity';
import { CartsService } from '../service/carts.service';

@Resolver(() => Cart)
export class CartsResolver {
  constructor(private readonly cartsService: CartsService) {}

  @Mutation(() => Cart)
  createCart(@Args('createCartInput') createCartInput: CreateCartInput) {
    return this.cartsService.create(createCartInput);
  }

  @Query(() => [Cart], { name: 'carts' })
  findAll() {
    return this.cartsService.findAll();
  }

  @Query(() => Cart, { name: 'cart' })
  findOne(@Args('id') id: string) {
    return this.cartsService.findOneById(id);
  }

  // @Mutation(() => Cart)
  // updateCart(@Args('updateCartInput') updateCartInput: UpdateCartInput) {
  //   return this.cartsService.update(updateCartInput.id, updateCartInput);
  // }

  @Mutation(() => Cart)
  removeCart(@Args('id') id: string) {
    return this.cartsService.remove(id);
  }
}
