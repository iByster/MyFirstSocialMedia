import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => String)
  @Column({ type: 'text', unique: true })
  username!: string;

  @Field(() => String)
  @Column({ type: 'text', unique: true })
  email!: string;

  @Column({ type: 'text' })
  password!: string;
}
