// import {ObjectId} from 'bson';
import {ObjectSchema} from 'realm';
export const MESSAGE_SCHEMA = 'Message';

export class Message {
  // _id!: ObjectId;
  id: string;
  senderId!: number;
  recevierId!: number;
  createdAt!: Date;
  message!: string;
  seen!: boolean;
  edited!: boolean;

  constructor(
    id: string,
    senderId: number,
    recevierId: number,
    message: string,
    edited?: boolean,
    createdAt?: Date,
    seen?: boolean,
  ) {
    // this._id = new ObjectId(id);
    this.id = id;
    this.senderId = senderId;
    this.recevierId = recevierId;
    this.message = message;
    this.createdAt = createdAt || new Date(Date.now());
    if (edited) {
      this.edited = edited;
    }
    if (seen) {
      this.seen = seen;
    }
  }

  public static MessageSchema: ObjectSchema = {
    name: MESSAGE_SCHEMA,
    primaryKey: 'id',
    properties: {
      // _id: 'objectId',
      id: 'string',
      message: 'string',
      senderId: 'int',
      recevierId: 'int',
      seen: {type: 'bool', default: false},
      edited: {type: 'bool', default: false},
      createdAt: 'date',
    },
  };
}
