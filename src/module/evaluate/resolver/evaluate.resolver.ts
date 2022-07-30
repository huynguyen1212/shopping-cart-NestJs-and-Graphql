import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RoleType } from 'src/common/constants/user.enum.';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateEvaluateInput } from '../dto/create-evaluate.input';
import { UpdateEvaluateInput } from '../dto/update-evaluate.input';
import { Evaluate } from '../entities/evaluate.entity';
import { EvaluateService } from '../service/evaluate.service';

@Resolver(() => Evaluate)
export class EvaluateResolver {
  constructor(private readonly evaluateService: EvaluateService) {}

  @Mutation(() => Evaluate)
  @Roles(RoleType.USER)
  createEvaluate(
    @Args('createEvaluateInput') createEvaluateInput: CreateEvaluateInput,
  ) {
    return this.evaluateService.create(createEvaluateInput);
  }

  @Query(() => [Evaluate], { name: 'evaluate' })
  findAll() {
    return this.evaluateService.findAll();
  }

  @Query(() => Evaluate, { name: 'evaluate' })
  @Roles(RoleType.ADMIN)
  findOne(@Args('id') id: string) {
    return this.evaluateService.findOneById(id);
  }

  @Mutation(() => Evaluate)
  @Roles(RoleType.USER)
  updateEvaluate(
    @Args('updateEvaluateInput') updateEvaluateInput: UpdateEvaluateInput,
  ) {
    return this.evaluateService.update(updateEvaluateInput);
  }

  @Mutation(() => Evaluate)
  @Roles(RoleType.ADMIN) // va user evaluste đó
  removeEvaluate(@Args('id') id: string) {
    return this.evaluateService.remove(id);
  }
}
