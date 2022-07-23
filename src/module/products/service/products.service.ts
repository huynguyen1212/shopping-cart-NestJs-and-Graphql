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

  // update(id: number, updateProductInput: UpdateProductInput) {
  //   return `This action updates a #${id} product`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }
}
