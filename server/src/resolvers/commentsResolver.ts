import { Resolver, Query, Ctx, FieldResolver, Root } from "type-graphql";
import { GraphqlContext } from "../types";
import { Comment } from "../entities/Comment";
import { Post } from "../entities/Post";

@Resolver(Comment)
export class CommentsResolver {
  @Query((returns) => [Comment])
  listComments() {
    return Comment.find();
  }

  async postsBatchFn(postIds: readonly typeof Comment.prototype.postId[]) {
    const posts = await Post.findByIds([...postIds]);
    return postIds.map((postId) => posts.find((post) => post.id === postId));
  }
  @FieldResolver((returns) => Post)
  post(@Root() comment: Comment, @Ctx() { getDataLoader }: GraphqlContext) {
    return getDataLoader(this.postsBatchFn).load(comment.postId);
  }
}
