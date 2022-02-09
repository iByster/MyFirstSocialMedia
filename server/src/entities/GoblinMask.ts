import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { User } from './User';

@ObjectType()
@Entity()
export class GoblinMask extends BaseEntity {
  @Field()
  @Column()
  photo!: string;

  @OneToMany(() => User, user => user.goblinMask)
  users!: User[];
}
