import { Field, ObjectType } from 'type-graphql';
import { BaseEntity } from './BaseEntity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './User';
import { Post } from './Post';

@ObjectType()
@Entity()
export class Updoot extends BaseEntity {
  @Field()
  @Column()
  postId!: number;

  @Field()
  @ManyToOne(() => Post, (post) => post.updoots)
  post!: Post;

  @Field()
  @Column()
  userId!: number;

  @Field()
  @ManyToOne(() => User, (user) => user.updoots)
  user!: User;
}
