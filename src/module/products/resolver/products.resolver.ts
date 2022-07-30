import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleType } from 'src/common/constants/user.enum.';
import { CreateProductInput } from '../dto/create-product.input';
import { UpdateProductInput } from '../dto/update-product.input';
import { Product } from '../entities/product.entity';
import { ProductsService } from '../service/products.service';

@Roles(RoleType.ADMIN)
@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productsService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'products' })
  findAll() {
    return this.productsService.findAll();
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args('name') name: string) {
    return this.productsService.findOne(name);
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productsService.update(updateProductInput);
  }

  @Mutation(() => Product)
  removeProduct(@Args('id') id: string) {
    return this.productsService.remove(id);
  }
}
