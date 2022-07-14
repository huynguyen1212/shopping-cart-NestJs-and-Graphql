import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from '../service/categories.service';
import { CategoriesResolver } from './categories.resolver';

describe('CategoriesResolver', () => {
  let resolver: CategoriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesResolver, CategoriesService],
    }).compile();

    resolver = module.get<CategoriesResolver>(CategoriesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
