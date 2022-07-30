import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEvaluateInput } from '../dto/create-evaluate.input';
import { UpdateEvaluateInput } from '../dto/update-evaluate.input';
import { Evaluate } from '../entities/evaluate.entity';

@Injectable()
export class EvaluateService {
  constructor(
    @InjectRepository(Evaluate)
    private readonly evaluateRepo: Repository<Evaluate>,
  ) {}

  create(createCommentInput: CreateEvaluateInput) {
    const evaluate = {
      ...createCommentInput,
    };

    this.evaluateRepo.insert(evaluate);
    return evaluate;
  }

  findAll() {
    return this.evaluateRepo.find();
  }

  findOneById(id: string) {
    return this.evaluateRepo.findOne({ where: { id } });
  }

  async update(input: UpdateEvaluateInput) {
    const { id, ...rest } = input;

    const evaluate = await this.findOneById(id);

    const newComment = Object.assign(evaluate, rest);

    await this.evaluateRepo.save(newComment);

    return newComment;
  }

  async remove(id: string): Promise<Evaluate> {
    const evaluate = await this.findOneById(id);

    await this.evaluateRepo.delete(id);

    return evaluate;
  }
}
