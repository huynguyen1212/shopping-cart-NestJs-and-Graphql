import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field()
  description: string;
}
