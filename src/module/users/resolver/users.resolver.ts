import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RoleType } from 'src/common/constants/user.enum.';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/module/auth/jwt-auth.guard';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';
import { User } from '../entities/user.entity';
import { UsersService } from '../service/users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // @Mutation(() => User)
  // createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
  //   return this.usersService.create(createUserInput);
  // }

  @Query(() => [User], { name: 'users' })
  @Roles(RoleType.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  @Roles(RoleType.ADMIN)
  findOne(@Args('username') username: string) {
    return this.usersService.findOne(username);
  }

  @Mutation(() => User)
  @Roles(RoleType.USER)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput);
  }

  // @Mutation(() => User)
  // removeUser(@Args('id') id: string) {
  //   return this.usersService.remove(id);
  // }
}
