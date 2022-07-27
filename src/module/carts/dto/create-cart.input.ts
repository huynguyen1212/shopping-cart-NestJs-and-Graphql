import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCartInput {
  @Field()
  total: number;

  @Field()
  productId: string;
}
