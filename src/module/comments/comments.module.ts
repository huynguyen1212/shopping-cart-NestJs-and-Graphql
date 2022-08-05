import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../posts/entities/post.entity';
import { PostsService } from '../posts/service/posts.service';
import { Comment } from './entities/comment.entity';
import { CommentsResolver } from './resolver/comments.resolver';
import { CommentsService } from './service/comments.service';

@Module({
  providers: [CommentsResolver, CommentsService, PostsService],
  imports: [TypeOrmModule.forFeature([Comment, Post])],
})
export class CommentsModule {}
