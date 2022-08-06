import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RoleType } from 'src/common/constants/user.enum.';
import { CurrentUser } from 'src/decorators/current-user';
import { Roles } from 'src/decorators/roles.decorator';
import { User } from 'src/module/users/entities/user.entity';
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
    @CurrentUser() user: User,
  ) {
    return this.evaluateService.create(createEvaluateInput, user);
  }

  @Query(() => [Evaluate], { name: 'evaluates' })
  findAll() {
    return this.evaluateService.findAll();
  }

  @Query(() => Evaluate, { name: 'evaluate' })
  findOne(@Args('id') id: string) {
    return this.evaluateService.findOneById(id);
  }

  // @Mutation(() => Evaluate)
  // updateEvaluate(
  //   @Args('updateEvaluateInput') updateEvaluateInput: UpdateEvaluateInput,
  // ) {
  //   return this.evaluateService.update(updateEvaluateInput);
  // }

  @Mutation(() => Evaluate)
  @Roles(RoleType.ADMIN) // va user evaluste đó
  removeEvaluate(@Args('id') id: string) {
    return this.evaluateService.remove(id);
  }
}
