import { InputType, Int, Field } from '@nestjs/graphql';
import { IsAlphanumeric } from 'class-validator';

@InputType()
export class CreateProductInput {
  @IsAlphanumeric()
  @Field()
  name: string;

  @Field()
  price: number;

  @Field()
  total: number;

  @Field()
  categoryId: string;
}
