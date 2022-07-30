import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RoleType } from 'src/common/constants/user.enum.';
import { Roles } from 'src/decorators/roles.decorator';
import { CreatePostInput } from '../dto/create-post.input';
import { UpdatePostInput } from '../dto/update-post.input';
import { Post } from '../entities/post.entity';
import { PostsService } from '../service/posts.service';

@Roles(RoleType.ADMIN)
@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => Post)
  createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postsService.create(createPostInput);
  }

  @Query(() => [Post], { name: 'posts' })
  findAll() {
    return this.postsService.findAll();
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id') id: string) {
    return this.postsService.findOneById(id);
  }

  @Mutation(() => Post)
  updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postsService.update(updatePostInput);
  }

  @Mutation(() => Post)
  removePost(@Args('id') id: string) {
    return this.postsService.remove(id);
  }
}
