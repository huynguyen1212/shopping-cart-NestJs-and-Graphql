import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/module/categories/service/categories.service';
import { Repository } from 'typeorm';
import { CreateProductInput } from '../dto/create-product.input';
import { UpdateProductInput } from '../dto/update-product.input';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    private readonly categoryService: CategoriesService,
  ) {}

  async create(createProductInput: CreateProductInput) {
    const category = await this.categoryService.findOneById(
      createProductInput.categoryId,
    );

    if (!category) {
      throw new Error('Category not found');
    }

    //check duplicate
    const duplicate = await this.productRepo
      .createQueryBuilder('pro')
      .andWhere('pro.name = :pro', { pro: createProductInput.name })
      .andWhere('pro.category.id = :cate', { cate: category.id })
      .getOne();

    if (duplicate) {
      const product = {
        ...duplicate,
        total: duplicate.total + createProductInput.total,
      };

      this.productRepo.save(product);
      return product;
    } else {
      const product = {
        total: createProductInput.total,
        name: createProductInput.name,
        price: createProductInput.price,
        category,
      };

      this.productRepo.insert(product);
      return product;
    }
  }

  findAll() {
    return this.productRepo.find();
  }

  findOne(name: string) {
    return this.productRepo.findOne({ where: { name } });
  }

  findOneById(id: string) {
    return this.productRepo.findOne({ where: { id } });
  }

  async update(input: UpdateProductInput) {
    const { id, ...rest } = input;

    const product = await this.findOneById(id);

    const newPeoduct = Object.assign(product, rest);

    await this.productRepo.save(newPeoduct);

    return newPeoduct;
  }

  async remove(id: string): Promise<Product> {
    const product = await this.findOneById(id);

    await this.productRepo.delete(id);

    return product;
  }
}
