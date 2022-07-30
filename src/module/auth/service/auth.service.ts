import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/module/users/entities/user.entity';
import { UsersService } from 'src/module/users/service/users.service';
import { LoginUserInput } from '../dto/login-user.input';
import * as bcrypt from 'bcrypt';
import { RoleType } from 'src/common/constants/user.enum.';
import { CreateUserInput } from 'src/module/users/dto/create-user.input';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);

    const valid = await bcrypt.compare(password, user?.password);

    if (user && valid) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: User) {
    const { password, ...result } = user;
    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user.id,
      }),
      user: result,
    };
  }

  async signup(createUserInput: CreateUserInput) {
    const user = await this.userService.findOne(createUserInput.username);

    if (user) {
      throw new Error('User already exists!');
    }

    const password = await bcrypt.hash(createUserInput.password, 10);

    return this.userService.create({
      ...createUserInput,
      password,
    });
  }
}
