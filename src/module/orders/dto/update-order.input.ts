import { CreateOrderInput } from './create-order.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { OrderType } from 'src/common/constants/order.enum';

@InputType()
export class UpdateOrderInput extends PartialType(CreateOrderInput) {
  @Field()
  id: string;

  @Field()
  status: OrderType;
}
