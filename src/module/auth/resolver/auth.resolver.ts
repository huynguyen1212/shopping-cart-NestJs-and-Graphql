import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from 'src/module/users/dto/create-user.input';
import { User } from 'src/module/users/entities/user.entity';
import { RoleType } from 'src/module/users/user.enum.';
import { LoginResponse } from '../dto/login-reponse';
import { LoginUserInput } from '../dto/login-user.input';
import { GqlAuthGuard } from '../gql-auth.guard';
import { AuthService } from '../service/auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    return this.authService.login(context.user);
  }

  @Mutation(() => User)
  signup(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.authService.signup(createUserInput);
  }
}
