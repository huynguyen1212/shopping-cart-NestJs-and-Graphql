import { InputType, Int, Field, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/module/posts/entities/post.entity';
import { Column, ManyToOne } from 'typeorm';
import { Comment } from '../entities/comment.entity';

@ObjectType()
export class PostAndCommentOutput {
  @Field()
  post: Post;

  @Field(() => Comment)
  comment: Comment[];
}
