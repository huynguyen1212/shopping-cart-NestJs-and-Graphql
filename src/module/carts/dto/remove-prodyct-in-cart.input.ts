import { InputType, Int, Field } from '@nestjs/graphql';
import { CartType } from 'src/common/constants/cart.enum';

@InputType()
export class RemoveProductInCartInput {
  @Field()
  productId: string;
}
