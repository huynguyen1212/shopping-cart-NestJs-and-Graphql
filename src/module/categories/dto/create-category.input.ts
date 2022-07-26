import { InputType, Int, Field } from '@nestjs/graphql';
import { IsAlphanumeric } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @IsAlphanumeric()
  @Field()
  name: string;
}
