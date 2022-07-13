import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { PostResolver } from './resolvers/post.resolver';

@Module({
  providers: [PostResolver],
  imports: [TypeOrmModule.forFeature([PostEntity])],
})
export class PostModule {}
