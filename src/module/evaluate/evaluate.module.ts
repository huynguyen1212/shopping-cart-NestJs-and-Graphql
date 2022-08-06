import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';
import { CategoriesService } from '../categories/service/categories.service';
import { Product } from '../products/entities/product.entity';
import { ProductsService } from '../products/service/products.service';
import { Evaluate } from './entities/evaluate.entity';
import { EvaluateResolver } from './resolver/evaluate.resolver';
import { EvaluateService } from './service/evaluate.service';

@Module({
  providers: [
    EvaluateResolver,
    EvaluateService,
    ProductsService,
    CategoriesService,
  ],
  imports: [TypeOrmModule.forFeature([Evaluate, Product, Category])],
})
export class EvaluateModule {}
