import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Post } from "./Post";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("text")
  body!: string;

  @ManyToOne((type) => Post, (post) => post.comments, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    nullable: false,
  })
  post!: Post;
}
