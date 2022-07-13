import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { CategoryResolver } from './resolvers/category.resolver';

@Module({
  providers: [CategoryResolver],
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
})
export class CategoryModule {}
