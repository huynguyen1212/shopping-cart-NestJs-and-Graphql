import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ormConfigOptions } from '../ormconfig';
import { UsersModule } from './module/users/users.module';
import { CategoriesModule } from './module/categories/categories.module';
import { CommentsModule } from './module/comments/comments.module';
import { OrdersModule } from './module/orders/orders.module';
import { PostsModule } from './module/posts/posts.module';
import { ProductsModule } from './module/products/products.module';
import { CartsModule } from './module/carts/carts.module';
import { AuthModule } from './module/auth/auth.module';
import { EvaluateModule } from './module/evaluate/evaluate.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfigOptions),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
    }),
    UsersModule,
    CategoriesModule,
    CommentsModule,
    OrdersModule,
    PostsModule,
    ProductsModule,
    CartsModule,
    AuthModule,
    EvaluateModule,
  ],
})
export class AppModule {}
