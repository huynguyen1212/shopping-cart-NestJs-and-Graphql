import { CreateEvaluateInput } from './create-evaluate.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateEvaluateInput extends PartialType(CreateEvaluateInput) {
  @Field()
  @IsNotEmpty()
  id: string;
}
