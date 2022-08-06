import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/module/products/service/products.service';
import { User } from 'src/module/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateEvaluateInput } from '../dto/create-evaluate.input';
import { UpdateEvaluateInput } from '../dto/update-evaluate.input';
import { Evaluate } from '../entities/evaluate.entity';

@Injectable()
export class EvaluateService {
  constructor(
    @InjectRepository(Evaluate)
    private readonly evaluateRepo: Repository<Evaluate>,
    private readonly productsService: ProductsService,
  ) {}

  async create(createCommentInput: CreateEvaluateInput, user: User) {
    const evaluate = new Evaluate();
    const product = await this.productsService.findOneById(
      createCommentInput.productId,
    );

    evaluate.content = createCommentInput.content;
    evaluate.user = user;
    evaluate.product = product;

    this.evaluateRepo.save(evaluate);
    return evaluate;
  }

  async findAll() {
    return this.evaluateRepo.find();
  }

  async findOneById(id: string) {
    return this.evaluateRepo.findOne({ where: { id } });
  }

  // async update(input: UpdateEvaluateInput) {
  //   const { id, ...rest } = input;

  //   const evaluate = await this.findOneById(id);

  //   const newEvaluate = Object.assign(evaluate, rest);

  //   await this.evaluateRepo.save(newEvaluate);

  //   return newEvaluate;
  // }

  async remove(id: string): Promise<Evaluate> {
    const evaluate = await this.findOneById(id);

    await this.evaluateRepo.delete(id);

    return evaluate;
  }
}
