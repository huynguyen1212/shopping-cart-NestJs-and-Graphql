import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ormConfigOptions } from '../ormconfig';
import { UserModule } from './module/user/user.module';
import { PostModule } from './module/post/post.module';
import { CommentModule } from './module/comment/comment.module';
import { CartModule } from './module/cart/cart.module';
import { OrderModule } from './module/order/order.module';
import { ProductModule } from './module/product/product.module';
import { CategoryModule } from './module/category/category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfigOptions),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    UserModule,
    PostModule,
    CommentModule,
    CartModule,
    OrderModule,
    ProductModule,
    CategoryModule,
  ],
  // controllers: [AppController],
})
export class AppModule {}
