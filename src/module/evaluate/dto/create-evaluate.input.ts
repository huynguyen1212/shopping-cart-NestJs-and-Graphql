import { InputType, Int, Field } from '@nestjs/graphql';
import { IsAlphanumeric } from 'class-validator';

@InputType()
export class CreateEvaluateInput {
  @IsAlphanumeric()
  @Field()
  content: string;

  @Field()
  productId: string;
}
