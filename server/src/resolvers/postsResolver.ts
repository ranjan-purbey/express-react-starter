import {
  Resolver,
  Query,
  FieldResolver,
  Root,
  ResolverInterface,
  Args,
  Ctx,
} from "type-graphql";
import { Post } from "../entities/Post";
import { GraphqlContext } from "../types";
import { Comment } from "../entities/Comment";
import { In } from "typeorm";

@Resolver(Post)
export class PostsResolver {
  @Query((returns) => [Post])
  listPosts() {
    return Post.find();
  }

  async commentsBatchFn(postIds: readonly typeof Post.prototype.id[]) {
    const comments = await Comment.find({
      where: { post: { id: In([...postIds]) } },
    });
    return postIds.map((postId) =>
      comments.filter((comment) => comment.postId === postId)
    );
  }
  @FieldResolver((returns) => Post)
  comments(@Root() post: Post, @Ctx() { getDataLoader }: GraphqlContext) {
    return getDataLoader(this.commentsBatchFn).load(post.id);
  }
}
