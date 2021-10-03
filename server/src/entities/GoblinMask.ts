import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@ObjectType()
@Entity()
export class GoblinMask extends BaseEntity {
  @Field()
  @Column()
  photo!: string;
}
