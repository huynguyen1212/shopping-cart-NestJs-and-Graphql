import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentsService } from 'src/module/comments/service/comments.service';
import { User } from 'src/module/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostInput } from '../dto/create-post.input';
import { UpdatePostInput } from '../dto/update-post.input';
import { Post } from '../entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>, // private readonly commentServce: CommentsService,
  ) {}

  async create(createProductInput: CreatePostInput, user: User) {
    const post = {
      ...createProductInput,
      user,
    };

    this.postRepo.insert(post);
    return post;
  }

  async findAll() {
    return this.postRepo.find();
  }

  async findOneById(id: string) {
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
