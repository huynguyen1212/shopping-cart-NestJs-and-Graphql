import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { AddProductToCartInput } from './add-product-to-cart.input';

@InputType()
export class UpdateCartInput extends PartialType(AddProductToCartInput) {
  @Field()
  id: string;

  @Field()
  status: string;
}
