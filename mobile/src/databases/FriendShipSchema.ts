// import {ObjectId} from 'bson';
import {ObjectSchema} from 'realm';
export const FRINDSHIP_SCHEMA = 'Friendship';

export type StatusType = 'pending' | 'request' | 'accepted' | 'declined';

export class FriendShip {
  // public _id: ObjectId;
  public id: number;
  public senderId!: number;
  public receiverId!: number;
  public status!: StatusType;

  constructor(
    id: number,
    senderId: number,
    receiverId: number,
    status?: StatusType,
  ) {
    // this._id = new ObjectId(id);
    this.id = id;
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.status = status || 'pending';
  }

  public static FriendShipSchema: ObjectSchema = {
    name: FRINDSHIP_SCHEMA,
    primaryKey: 'id',
    // embedded: true,
    properties: {
      // _id: 'objectId',
      id: 'int',
      senderId: 'int',
      receiverId: 'int',
      // receiverId: USER_SCHEMA,
      status: {type: 'string', default: 'pending'},
    },
  };
}
