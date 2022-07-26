import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentInput } from '../dto/create-comment.input';
import { UpdateCommentInput } from '../dto/update-comment.input';
import { Comment } from '../entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
  ) {}

  create(createCommentInput: CreateCommentInput) {
    const comment = {
      ...createCommentInput,
    };

    this.commentRepo.insert(comment);
    return comment;
  }

  findAll() {
    return this.commentRepo.find();
  }

  findOneById(id: string) {
    return this.commentRepo.findOne({ where: { id } });
  }

  async update(input: UpdateCommentInput) {
    const { id, ...rest } = input;

    const comment = await this.findOneById(id);

    const newComment = Object.assign(comment, rest);

    await this.commentRepo.save(newComment);

    return newComment;
  }

  async remove(id: string): Promise<Comment> {
    const comment = await this.findOneById(id);

    await this.commentRepo.delete(id);

    return comment;
  }
}
