import { CreateProductInput } from './create-product.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  @Field()
  @IsNotEmpty()
  id: string;
}
