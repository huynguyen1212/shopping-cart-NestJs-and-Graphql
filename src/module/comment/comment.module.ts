import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { CommentResolver } from './resolvers/comment.resolver';

@Module({
  providers: [CommentResolver],
  imports: [TypeOrmModule.forFeature([CommentEntity])],
})
export class CommentModule {}
