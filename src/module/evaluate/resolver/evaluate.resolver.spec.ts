import { Test, TestingModule } from '@nestjs/testing';
import { EvaluateService } from '../service/evaluate.service';
import { EvaluateResolver } from './evaluate.resolver';

describe('EvaluateResolver', () => {
  let resolver: EvaluateResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EvaluateResolver, EvaluateService],
    }).compile();

    resolver = module.get<EvaluateResolver>(EvaluateResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
