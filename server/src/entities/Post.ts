import { Field, ObjectType } from 'type-graphql';
import { BaseEntity } from './BaseEntity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './User';

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  text!: string;

  @Field()
  @Column()
  points!: number;

  @Field()
  @Column()
  creatorId!: number;

  @ManyToOne(() => User, (user) => user.posts)
  creator!: User;
}
