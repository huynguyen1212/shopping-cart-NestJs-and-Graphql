import { Module } from '@nestjs/common';
import { CategoriesResolver } from './resolver/categories.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CategoriesService } from './service/categories.service';

@Module({
  providers: [CategoriesResolver, CategoriesService],
  imports: [TypeOrmModule.forFeature([Category])],
})
export class CategoriesModule {}
