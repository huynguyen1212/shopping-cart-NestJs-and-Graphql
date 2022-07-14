import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from '../service/comments.service';
import { CommentsResolver } from './comments.resolver';

describe('CommentsResolver', () => {
  let resolver: CommentsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentsResolver, CommentsService],
    }).compile();

    resolver = module.get<CommentsResolver>(CommentsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
