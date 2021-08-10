import { Field, ObjectType } from 'type-graphql';
import { BaseEntity } from './BaseEntity';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field(() => String)
  @Column({type: 'text'})
  title!: string;
}
