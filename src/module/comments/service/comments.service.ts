import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsService } from 'src/module/posts/service/posts.service';
import { User } from 'src/module/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCommentInput } from '../dto/create-comment.input';
import { PostAndCommentOutput } from '../dto/post-and-comment.output';
import { UpdateCommentInput } from '../dto/update-comment.input';
import { Comment } from '../entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    private readonly postService: PostsService,
  ) {}

  async create(createCommentInput: CreateCommentInput, user: User) {
    const comment = new Comment();

    const post = await this.postService.findOneById(createCommentInput.postId);

    comment.content = createCommentInput.content;
    comment.post = post;
    comment.user = user;

    this.commentRepo.save(comment);
    return comment;
  }

  async findAll() {
    return this.commentRepo.find();
  }

  async findByPostId(postId: string) {
    const comment = this.commentRepo
      .createQueryBuilder('c')
      .andWhere('c.post.id = :p', { p: postId })
      .getMany();

    return comment;
  }

  async findAllPostAndComment(postId: string) {
    const post = await this.postService.findOneById(postId);
    const comment = await this.findByPostId(postId);

    const postAndComment: PostAndCommentOutput = {
      post,
      comment,
    };

    return postAndComment;
  }

  async findOneById(id: string) {
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
