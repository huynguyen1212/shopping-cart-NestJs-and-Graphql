import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductInput } from '../dto/create-product.input';
import { UpdateProductInput } from '../dto/update-product.input';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  create(createProductInput: CreateProductInput) {
    const product = {
      ...createProductInput,
    };

    this.productRepo.insert(product);
    return product;
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
