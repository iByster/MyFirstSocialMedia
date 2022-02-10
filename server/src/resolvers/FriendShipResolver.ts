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
import { FriendShip } from '../entities/FriendShip';
import { User } from '../entities/User';

@ObjectType()
class FriendShipError {
  @Field(() => String)
  message!: string;
}

@InputType()
class UpdateStatusPayload {
  @Field()
  friendshipId!: number;

  @Field()
  status!: 'pending' | 'request' | 'accepted' | 'declined';
}

@ObjectType()
class FriendShipResponse {
  @Field(() => [FriendShipError], { nullable: true })
  errors?: FriendShipError[];

  @Field(() => Boolean, { nullable: true })
  ok?: Boolean;

  @Field(() => FriendShip, { nullable: true })
  friendship?: FriendShip;
}

@InputType()
class AddFriendInput {
  @Field()
  receiverUsername!: string;
  @Field()
  senderId!: number;
}

@Resolver()
export class FriendShipResolver {
  @Mutation(() => FriendShipResponse)
  public async addFriend(
    @Arg('options', () => AddFriendInput) options: AddFriendInput
  ): Promise<FriendShipResponse> {
    const { senderId, receiverUsername } = options;

    const friendFound = await User.findOne(
      receiverUsername.includes('@')
        ? { where: { email: receiverUsername } }
        : { where: { username: receiverUsername } }
    );


    if (!friendFound) {
      return {
        errors: [
          {
            message: 'this user does not exist',
          },
        ],
      };
    }

    const receiverId = friendFound.id;
    const existingFriendship = await FriendShip.findOne({
      where: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });

    if (existingFriendship) {
      return {
        errors: [
          {
            message: 'this friendship already exists',
          },
        ],
      };
    }

    const newFriendship = await FriendShip.create({
      receiverId: receiverId,
      senderId: senderId,
      status: 'pending',
    }).save();

    return { friendship: newFriendship };
  }

  @Query(() => [FriendShip])
  public async getAllFriendShipsByUser(
    @Arg('userId', () => Float) userId: number
  ): Promise<FriendShip[]> {
    return await FriendShip.find({
      where: [{ senderId: userId }, { receiverId: userId }],
    });
  }

  @Mutation(() => FriendShipResponse)
  public async updateFriendShipStatus(
    @Arg('updatePayload', () => UpdateStatusPayload)
    updatePayload: UpdateStatusPayload
  ): Promise<FriendShipResponse> {
    const { friendshipId, status } = updatePayload;
    try {
      await FriendShip.update({ id: friendshipId }, { status });
      const updatedFriendship = await FriendShip.findOne(friendshipId)!;
      return {
        ok: true,
        friendship: updatedFriendship,
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

  @Mutation(() => FriendShipResponse)
  public async deleteFriendShip(
    @Arg('friendshipId', () => Float) friendshipId: number
  ): Promise<FriendShipResponse> {
    try {
      await FriendShip.delete({ id: friendshipId });
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
}
