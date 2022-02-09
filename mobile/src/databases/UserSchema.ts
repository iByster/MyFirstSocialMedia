// import {ObjectId} from 'bson';
import {ObjectSchema} from 'realm';
import {FriendShip} from './FriendShipSchema';

export const USER_SCHEMA = 'User';
export const FRINDSHIP_SCHEMA = 'Friendship';

export class User {
  public static UserSchema: ObjectSchema = {
    name: USER_SCHEMA,
    primaryKey: 'id',
    properties: {
      // _id: 'objectId',
      id: 'int',
      username: {type: 'string', indexed: true},
      friends: {type: 'list', objectType: FRINDSHIP_SCHEMA},
      password: 'string',
      email: {type: 'string', indexed: true},
      profilePic: 'string',
      pending: 'bool?',
    },
  };
  id: number;
  // _id!: ObjectId;
  username!: string;
  email!: string;
  password!: string;
  friends!: FriendShip[];
  profilePic: any;
  pending?: boolean;

  constructor(
    id: number,
    username: string,
    password: string,
    profilePic: string,
    email: string,
  ) {
    this.id = id;
    // this._id = new ObjectId(id);
    this.username = username;
    this.password = password;
    this.profilePic = profilePic;
    this.friends = [];
    this.email = email;
  }
}
