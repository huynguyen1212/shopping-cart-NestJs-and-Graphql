import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RoleType } from 'src/common/constants/user.enum.';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateCommentInput } from '../dto/create-comment.input';
import { UpdateCommentInput } from '../dto/update-comment.input';
import { Comment } from '../entities/comment.entity';
import { CommentsService } from '../service/comments.service';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation(() => Comment)
  @Roles(RoleType.USER)
  createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ) {
    return this.commentsService.create(createCommentInput);
  }

  @Query(() => [Comment], { name: 'comments' })
  findAll() {
    return this.commentsService.findAll();
  }

  @Query(() => Comment, { name: 'comment' })
  @Roles(RoleType.ADMIN)
  findOneById(@Args('id') id: string) {
    return this.commentsService.findOneById(id);
  }

  @Mutation(() => Comment)
  @Roles(RoleType.USER)
  updateComment(
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
  ) {
    return this.commentsService.update(updateCommentInput);
  }

  @Mutation(() => Comment)
  @Roles(RoleType.ADMIN) // user cos comment đó
  removeComment(@Args('id') id: string) {
    return this.commentsService.remove(id);
  }
}
