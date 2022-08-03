import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryInput } from '../dto/create-category.input';
import { UpdateCategoryInput } from '../dto/update-category.input';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  create(createProductInput: CreateCategoryInput) {
    const category = {
      ...createProductInput,
    };

    this.categoryRepo.insert(category);
    return category;
  }

  findAll() {
    return this.categoryRepo.find();
  }

  findOne(name: string) {
    return this.categoryRepo.findOne({ where: { name } });
  }

  findOneById(id: string) {
    return this.categoryRepo.findOne({ where: { id } });
  }

  async update(input: UpdateCategoryInput) {
    const { id, ...rest } = input;

    const category = await this.findOneById(id);

    const newCategory = Object.assign(category, rest);

    await this.categoryRepo.save(newCategory);

    return newCategory;
  }

  async remove(id: string): Promise<Category> {
    const category = await this.findOneById(id);

    await this.categoryRepo.delete(id);

    return category;
  }
}
