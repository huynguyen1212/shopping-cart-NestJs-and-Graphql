import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/module/users/service/users.service';
import { LoginUserInput } from '../dto/login-user.input';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(loginUserInput: LoginUserInput) {
    const user = await this.userService.findOne(loginUserInput.username);
    const { password, ...result } = user;

    return {
      access_token: 'jwt',
      user: result,
    };
  }
}
