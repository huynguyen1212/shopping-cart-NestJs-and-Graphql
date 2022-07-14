import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostsResolver } from './resolver/posts.resolver';
import { PostsService } from './service/posts.service';

@Module({
  providers: [PostsResolver, PostsService],
  imports: [TypeOrmModule.forFeature([Post])],
})
export class PostsModule {}
