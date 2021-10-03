import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { GoblinMask } from './GoblinMask';
import { Post } from './Post';
import { Updoot } from './Updoot';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Post, (post) => post.creator)
  posts!: Post[];

  @OneToMany(() => Updoot, (updoot) => updoot.userId)
  updoots!: Updoot[];

  @Field()
  @OneToOne(() => GoblinMask)
  @JoinColumn()
  goblinMask!: GoblinMask;
}
