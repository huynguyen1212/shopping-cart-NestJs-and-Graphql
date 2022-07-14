import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { CommentsResolver } from './resolver/comments.resolver';
import { CommentsService } from './service/comments.service';

@Module({
  providers: [CommentsResolver, CommentsService],
  imports: [TypeOrmModule.forFeature([Comment])],
})
export class CommentsModule {}
