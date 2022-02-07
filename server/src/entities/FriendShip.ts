import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@ObjectType()
@Entity()
export class FriendShip extends BaseEntity {
  @Field()
  @Column()
  senderId!: number;

  @Field()
  @Column()
  receiverId!: number;

  @Column()
  @Field()
  status!: 'pending' | 'request' | 'accepted' | 'declined';
}
