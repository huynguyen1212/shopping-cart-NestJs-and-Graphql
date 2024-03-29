import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RoleType } from 'src/common/constants/user.enum.';
import { CurrentUser } from 'src/decorators/current-user';
import { Roles } from 'src/decorators/roles.decorator';
import { Product } from 'src/module/products/entities/product.entity';
import { User } from 'src/module/users/entities/user.entity';
import { AddProductToCartInput } from '../dto/add-product-to-cart.input';
import { RemoveProductInCartInput } from '../dto/remove-prodyct-in-cart.input';
import { UpdateCartInput } from '../dto/update-cart.input';
import { Cart } from '../entities/cart.entity';
import { CartsService } from '../service/carts.service';

@Resolver(() => Cart)
export class CartsResolver {
  constructor(private readonly cartsService: CartsService) {}

  @Mutation(() => Cart)
  @Roles(RoleType.USER)
  addProductToCart(
    @Args('addProductToCart') addProductToCart: AddProductToCartInput,
    @CurrentUser() user: User,
  ) {
    return this.cartsService.addProductToCart(addProductToCart, user);
  }

  @Mutation(() => Cart)
  @Roles(RoleType.USER)
  removeProductInCart(
    @Args('removeProductInCartInput')
    removeProductInCartInput: RemoveProductInCartInput,
    @CurrentUser() user: User,
  ) {
    return this.cartsService.removeProductInCart(
      removeProductInCartInput,
      user,
    );
  }

  @Mutation(() => Cart)
  @Roles(RoleType.USER)
  updateStatusCart(
    @Args('updateStatusCart')
    updateStatusCart: UpdateCartInput,
  ) {
    return this.cartsService.update(updateStatusCart);
  }

  @Query(() => [Cart], { name: 'carts' })
  @Roles(RoleType.USER)
  findAll(@CurrentUser() user: User) {
    return this.cartsService.findAll(user);
  }

  @Query(() => [Product], { name: 'productsSaled' })
  @Roles(RoleType.USER)
  findSaled(@CurrentUser() user: User) {
    return this.cartsService.findSaled(user);
  }

  @Query(() => Cart, { name: 'cart' })
  @Roles(RoleType.USER)
  findOne(@Args('id') id: string) {
    return this.cartsService.findOneById(id);
  }

  @Mutation(() => Cart)
  @Roles(RoleType.USER)
  removeOneTypeProductInCart(@Args('id') id: string) {
    return this.cartsService.removeOneTypeProductInCart(id);
  }

  @Mutation(() => Cart)
  @Roles(RoleType.USER)
  removeAllCart(@CurrentUser() user: User) {
    return this.cartsService.removeAllCart(user);
  }
}
