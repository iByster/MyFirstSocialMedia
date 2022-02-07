import {
  Arg,
  Field,
  Float,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { Message } from '../entities/Message';

@ObjectType()
class MessageError {
  @Field(() => String)
  message!: string;
}

@ObjectType()
class MessageResponse {
  @Field(() => [MessageError], { nullable: true })
  errors?: MessageError[];

  @Field(() => Boolean, { nullable: true })
  ok?: Boolean;

  @Field(() => Message, { nullable: true })
  message?: Message;
}

@InputType()
class UpdateMessagePayload {
  @Field()
  messageId!: string;

  @Field()
  message!: string;
}

@InputType()
class SendMessageInput {
  @Field()
  uuid!: string;

  @Field()
  senderId!: number;

  @Field()
  receiverId!: number;

  @Field()
  message!: string;
}

@Resolver(Message)
export class MessageResolver {
  @Mutation(() => MessageResponse)
  public async sendMessage(
    @Arg('options', () => SendMessageInput) options: SendMessageInput
  ): Promise<MessageResponse> {
    const { senderId, receiverId, message, uuid } = options;

    const alreadyExists = await Message.findOne({ where: { uuid }});

    if (alreadyExists) {
      return {
        errors: [
          {
            message: 'This message already exists',
          },
        ],
      };
    } else {
      const newMessage = await Message.create({
        uuid,
        receiverId,
        senderId,
        message,
      }).save();

      return { message: newMessage };
    }
  }

  @Mutation(() => MessageResponse)
  public async deleteMessage(
    @Arg('messageId', () => String) messageId: string
  ): Promise<MessageResponse> {
    try {
      await Message.delete({ uuid: messageId });
      return {
        ok: true,
      };
    } catch (err: any) {
      return {
        errors: [
          {
            message: err,
          },
        ],
        ok: false,
      };
    }
  }

  @Mutation(() => MessageResponse)
  public async updateMessage(
    @Arg('updatePayload', () => UpdateMessagePayload)
    updatePayload: UpdateMessagePayload
  ): Promise<MessageResponse> {
    const { messageId, message } = updatePayload;

    try {
      await Message.update({ uuid: messageId }, { message, edited: true });
      const updatedMessage = await Message.findOne({where: {uuid: messageId}});
      return {
        ok: true,
        message: updatedMessage,
      };
    } catch (err: any) {
      return {
        ok: false,
        errors: [
          {
            message: err,
          },
        ],
      };
    }
  }

  @Query(() => Message, { nullable: true })
  public async getMessageById(
    @Arg('messageId', () => Float) messageId: number
  ): Promise<Message | undefined | null> {
    return await Message.findOne(messageId);
  }

  @Query(() => [Message])
  public async getAllMessagesByUsers(
    @Arg('userId1', () => Float) userId1: number,
    @Arg('userId2', () => Float) userId2: number
  ): Promise<Message[]> {
    const res = await Message.find({
      where: [
        { senderId: userId1, receiverId: userId2 },
        { receiverId: userId1, senderId: userId2 },
      ],
    });

    console.log(res);

    return res;
  }

  @Query(() => [Message])
  public async messages(): Promise<Message[]> {
    return await Message.find();
  }
}
