import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Comment } from "./Comment";

@ObjectType({ description: "Post model" })
@Entity("posts")
export class Post extends BaseEntity {
  @Field((type) => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field((type) => String)
  @Column()
  title!: string;

  @Field((type) => String)
  @Column("text")
  body!: string;

  @Field((type) => [Comment])
  @OneToMany((type) => Comment, (comment) => comment.post)
  comments!: Comment[];
}
