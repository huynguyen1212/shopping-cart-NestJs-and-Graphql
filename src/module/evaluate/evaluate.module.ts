import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evaluate } from './entities/evaluate.entity';
import { EvaluateResolver } from './resolver/evaluate.resolver';
import { EvaluateService } from './service/evaluate.service';

@Module({
  providers: [EvaluateResolver, EvaluateService],
  imports: [TypeOrmModule.forFeature([Evaluate])],
})
export class EvaluateModule {}
