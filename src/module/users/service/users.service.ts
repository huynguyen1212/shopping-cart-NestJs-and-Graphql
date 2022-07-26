import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  create(createUserInput: CreateUserInput) {
    const user = {
      ...createUserInput,
    };

    this.userRepo.insert(user);
    return user;
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(username: string) {
    return this.userRepo.findOne({ where: { username } });
  }

  findOneById(id: string) {
    return this.userRepo.findOne({ where: { id } });
  }

  async update(input: UpdateUserInput) {
    const { id, ...rest } = input;

    const user = await this.findOneById(id);

    const newUser = Object.assign(user, rest);

    await this.userRepo.save(newUser);

    return newUser;
  }

  async remove(id: string): Promise<User> {
    const user = await this.findOneById(id);

    await this.userRepo.delete(id);

    return user;
  }
}
