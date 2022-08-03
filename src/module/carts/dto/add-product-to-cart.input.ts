import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddProductToCartInput {
  @Field()
  total: number;

  @Field()
  productId: string;
}
