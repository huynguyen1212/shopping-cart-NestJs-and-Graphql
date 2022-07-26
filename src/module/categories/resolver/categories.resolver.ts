import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Category } from '../entities/category.entity';
import { CreateCategoryInput } from '../dto/create-category.input';
import { UpdateCategoryInput } from '../dto/update-category.input';
import { CategoriesService } from '../service/categories.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/module/auth/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { RoleType } from 'src/common/constants/user.enum.';
import { Roles } from 'src/decorators/roles.decorator';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Mutation(() => Category)
  @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(RoleType.ADMIN)
  createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ) {
    return this.categoriesService.create(createCategoryInput);
  }

  @Query(() => [Category], { name: 'categories' })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Query(() => Category, { name: 'category' })
  findOne(@Args('name') name: string) {
    return this.categoriesService.findOne(name);
  }

  @Mutation(() => Category)
  updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ) {
    return this.categoriesService.update(updateCategoryInput);
  }

  @Mutation(() => Category)
  removeCategory(@Args('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
