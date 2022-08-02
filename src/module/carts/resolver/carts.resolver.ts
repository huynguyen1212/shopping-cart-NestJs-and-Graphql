import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RoleType } from 'src/common/constants/user.enum.';
import { CurrentUser } from 'src/decorators/current-user';
import { Roles } from 'src/decorators/roles.decorator';
import { User } from 'src/module/users/entities/user.entity';
import { CreateCartInput } from '../dto/create-cart.input';
import { Cart } from '../entities/cart.entity';
import { CartsService } from '../service/carts.service';

@Resolver(() => Cart)
export class CartsResolver {
  constructor(private readonly cartsService: CartsService) {}

  @Mutation(() => Cart)
  @Roles(RoleType.USER)
  createCart(
    @Args('createCartInput') createCartInput: CreateCartInput,
    @CurrentUser() user: User,
  ) {
    return this.cartsService.create(createCartInput, user);
  }

  @Query(() => [Cart], { name: 'carts' })
  findAll() {
    return this.cartsService.findAll();
  }

  @Query(() => Cart, { name: 'cart' })
  findOne(@Args('id') id: string) {
    return this.cartsService.findOneById(id);
  }

  @Mutation(() => Cart)
  removeCart(@Args('id') id: string) {
    return this.cartsService.remove(id);
  }
}
