import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@ObjectType()
@Entity()
export class Message extends BaseEntity {
  @Field()
  @Column()
  uuid!: string;
  
  @Field()
  @Column()
  senderId!: number;

  @Field()
  @Column()
  receiverId!: number;

  @Column()
  @Field()
  message!: string;

  @Column({ default: false })
  @Field()
  seen!: boolean;

  @Column({ default: false })
  @Field()
  edited!: boolean;
}
