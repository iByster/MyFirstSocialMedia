import { Field, ObjectType } from 'type-graphql';
import { BaseEntity } from './BaseEntity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { Updoot } from './Updoot';

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field()
  @Column()
  title?: string;

  @Field()
  @Column()
  text?: string;

  @Field()
  @Column({ type: 'int', default: 0 })
  points!: number;

  @Field()
  @Column()
  creatorId!: number;

  @Field()
  @ManyToOne(() => User, (user) => user.posts)
  creator!: User;

  @OneToMany(() => Updoot, (updoot) => updoot.postId)
  updoots!: Updoot[];
}
