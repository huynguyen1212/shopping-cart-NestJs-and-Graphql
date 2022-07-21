import { InputType, Int, Field } from '@nestjs/graphql';
import { IsAlphanumeric } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsAlphanumeric()
  @Field()
  username: string;

  @Field()
  password: string;
}
