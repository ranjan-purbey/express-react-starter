import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from "typeorm";
import { Post } from "./Post";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType({ description: "Comment model" })
@Entity("comments")
export class Comment extends BaseEntity {
  @Field((type) => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field((type) => String)
  @Column("text")
  body!: string;

  @Column()
  postId!: typeof Post.prototype.id;

  @Field((type) => Post)
  @ManyToOne((type) => Post, (post) => post.comments, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    nullable: false,
  })
  post!: Post;
}
