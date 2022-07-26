import { CreateCategoryInput } from './create-category.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
  @Field()
  @IsNotEmpty()
  id: string;
}
