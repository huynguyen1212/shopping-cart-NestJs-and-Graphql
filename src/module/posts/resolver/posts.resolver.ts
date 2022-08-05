import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RoleType } from 'src/common/constants/user.enum.';
import { CurrentUser } from 'src/decorators/current-user';
import { Roles } from 'src/decorators/roles.decorator';
import { User } from 'src/module/users/entities/user.entity';
import { CreatePostInput } from '../dto/create-post.input';
import { UpdatePostInput } from '../dto/update-post.input';
import { Post } from '../entities/post.entity';
import { PostsService } from '../service/posts.service';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => Post)
  @Roles(RoleType.ADMIN)
  createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @CurrentUser() user: User,
  ) {
    return this.postsService.create(createPostInput, user);
  }

  @Query(() => [Post], { name: 'posts' })
  findAll() {
    return this.postsService.findAll();
  }

  @Query(() => Post, { name: 'post' })
  @Roles(RoleType.ADMIN)
  findOne(@Args('id') id: string) {
    return this.postsService.findOneById(id);
  }

  @Mutation(() => Post)
  @Roles(RoleType.ADMIN)
  updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postsService.update(updatePostInput);
  }

  @Mutation(() => Post)
  @Roles(RoleType.ADMIN)
  removePost(@Args('id') id: string) {
    return this.postsService.remove(id);
  }
}
