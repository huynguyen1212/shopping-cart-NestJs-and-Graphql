import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/module/auth/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { RoleType } from 'src/common/constants/user.enum.';
import { CreateProductInput } from '../dto/create-product.input';
import { UpdateProductInput } from '../dto/update-product.input';
import { Product } from '../entities/product.entity';
import { ProductsService } from '../service/products.service';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productsService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'products' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(RoleType.ADMIN)
  findAll() {
    return this.productsService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Query(() => Product, { name: 'product' })
  findOne(@Args('name') name: string) {
    return this.productsService.findOne(name);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => Product)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productsService.update(updateProductInput);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => Product)
  removeProduct(@Args('id') id: string) {
    return this.productsService.remove(id);
  }
}
