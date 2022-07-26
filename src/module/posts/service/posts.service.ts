import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostInput } from '../dto/create-post.input';
import { UpdatePostInput } from '../dto/update-post.input';
import { Post } from '../entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
  ) {}

  create(createProductInput: CreatePostInput) {
    const post = {
      ...createProductInput,
    };

    this.postRepo.insert(post);
    return post;
  }

  findAll() {
    return this.postRepo.find();
  }

  findOneById(id: string) {
    return this.postRepo.findOne({ where: { id } });
  }

  async update(input: UpdatePostInput) {
    const { id, ...rest } = input;

    const post = await this.findOneById(id);

    const newPeoduct = Object.assign(post, rest);

    await this.postRepo.save(newPeoduct);

    return newPeoduct;
  }

  async remove(id: string): Promise<Post> {
    const post = await this.findOneById(id);

    await this.postRepo.delete(id);

    return post;
  }
}
