import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RoleType } from 'src/common/constants/user.enum.';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateOrderInput } from '../dto/create-order.input';
import { UpdateOrderInput } from '../dto/update-order.input';
import { Order } from '../entities/order.entity';
import { OrdersService } from '../service/orders.service';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Mutation(() => Order)
  @Roles(RoleType.USER)
  createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    return this.ordersService.create(createOrderInput);
  }

  @Query(() => [Order], { name: 'orders' })
  @Roles(RoleType.ADMIN) // và các order của user đó
  findAll() {
    return this.ordersService.findAll();
  }

  @Query(() => Order, { name: 'order' })
  findOne(@Args('id') id: string) {
    return this.ordersService.findOneById(id);
  }

  // @Mutation(() => Order)
  // updateOrder(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
  //   return this.ordersService.update(updateOrderInput.id, updateOrderInput);
  // }

  @Mutation(() => Order)
  removeOrder(@Args('id') id: string) {
    return this.ordersService.remove(id);
  }
}
