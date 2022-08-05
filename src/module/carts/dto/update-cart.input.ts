import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CartType } from 'src/common/constants/cart.enum';
import { AddProductToCartInput } from './add-product-to-cart.input';

@InputType()
export class UpdateCartInput extends PartialType(AddProductToCartInput) {
  @Field()
  id: string;

  @Field()
  status: CartType;
}
