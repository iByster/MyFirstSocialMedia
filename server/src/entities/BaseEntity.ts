import { Field, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity as BaseBaseEntityXD,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export abstract class BaseEntity extends BaseBaseEntityXD {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date;
}
