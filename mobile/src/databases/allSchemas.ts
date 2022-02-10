import {ObjectId} from 'bson';
import Realm, {Configuration} from 'realm';
import {UserCardType} from '../components/UsersList/UserListItem';
import {FriendShip} from './FriendShipSchema';
import {Message, MESSAGE_SCHEMA} from './MessageSchema';
import {FRINDSHIP_SCHEMA, User, USER_SCHEMA} from './UserSchema';

const databaseOptions: Configuration = {
  // path: './mobile/src/databases/data',
  schema: [User.UserSchema, FriendShip.FriendShipSchema, Message.MessageSchema],
  schemaVersion: 0,
};

export const insertFriendShip = (newFriendShip: FriendShip) =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          realm.create(FRINDSHIP_SCHEMA, newFriendShip);
          resolve(newFriendShip);
        });
        //realm.close();
      })
      .catch(error => reject(error));
  });

export const insertMessage = (newMessage: Message) =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          realm.create(MESSAGE_SCHEMA, newMessage);
          resolve(newMessage);
        });
        //realm.close();
      })
      .catch(error => reject(error));
  });

export const getAllFriendShipsByUser = (
  userId: number,
): Promise<FriendShip[]> =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let friendshipFound = realm
            .objects(FRINDSHIP_SCHEMA)
            .filtered('senderId == $0 OR receiverId == $0', userId);
          if (friendshipFound) {
            resolve(JSON.parse(JSON.stringify(friendshipFound)));
          } else {
            resolve(friendshipFound);
          }
        });
        //realm.close();
      })
      .catch(error => reject(error));
  });

export const getAllUsersDTOs = (): Promise<User[]> =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let friendshipFound = realm.objects(USER_SCHEMA);
          // .filtered('senderId == $0 OR receiverId == $0', userId);
          if (friendshipFound) {
            resolve(JSON.parse(JSON.stringify(friendshipFound)));
          } else {
            resolve(friendshipFound);
          }
        });
        //realm.close();
      })
      .catch(error => reject(error));
  });

export const getAllMessagesByUsers = (
  senderId: number,
  receiverId: number,
): Promise<Message[]> =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let resMessages = realm
            .objects(MESSAGE_SCHEMA)
            .filtered(
              'senderId == $0 AND recevierId == $1 OR senderId == $1 AND recevierId = $0',
              senderId,
              receiverId,
            );
          if (resMessages) {
            resolve(JSON.parse(JSON.stringify(resMessages)));
          } else {
            resolve(resMessages);
          }
        });
        //realm.close();
      })
      .catch(error => reject(error));
  });

export const alreadyFriends = (user1Id: ObjectId, user2Id: ObjectId) =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let friendshipFound = realm
            .objects(FRINDSHIP_SCHEMA)
            .filtered(
              'senderId == $0 AND receiverId == $1 OR senderId == $1 AND receiverId = $0',
              user1Id,
              user2Id,
            )[0];
          // const result = Object.keys(friendshipFound).length === 0 ? null : friendshipFound;
          if (friendshipFound) {
            resolve(JSON.parse(JSON.stringify(friendshipFound)));
          } else {
            resolve(friendshipFound);
          }
        });
        //realm.close();
      })
      .catch(error => reject(error));
  });

export const insertUser = (newUser: User) =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          realm.create(USER_SCHEMA, newUser);
          resolve(newUser);
        });
        //realm.close();
      })
      .catch(error => reject(error));
  });

export const getUser = (
  usernameOrEmail: string,
  password: string,
): Promise<User> =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let userFound = realm
            .objects(USER_SCHEMA)
            .filtered(
              '(username == $0 OR email == $0) AND password == $1',
              usernameOrEmail,
              password,
            )[0];
          // const result = Object.keys(userFound).length === 0 ? null : userFound;
          if (userFound) {
            resolve(JSON.parse(JSON.stringify(userFound)));
          } else {
            resolve(userFound);
          }
        });
        //realm.close();
      })
      .catch(error => reject(error));
  });

export const getUserById = (userId: number): Promise<User> =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let userFound = realm.objectForPrimaryKey(USER_SCHEMA, userId);
          // const result = Object.keys(userFound).length === 0 ? null : userFound;
          if (userFound) {
            resolve(JSON.parse(JSON.stringify(userFound)));
          } else {
            resolve({} as User);
          }
        });
        //realm.close();
      })
      .catch(error => reject(error));
  });

export const getMessageById = (messageId: ObjectId): Promise<Message> =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let messageFound = realm.objectForPrimaryKey(
            MESSAGE_SCHEMA,
            messageId,
          );
          // const result = Object.keys(MessageFound).length === 0 ? null : MessageFound;
          if (messageFound) {
            resolve(JSON.parse(JSON.stringify(messageFound)));
          } else {
            resolve({} as Message);
          }
        });
        // //realm.close();
      })
      .catch(error => reject(error));
  });

// export const updateNewxUser = (user: User) =>
//   new Promise((resolve, reject) => {
//     Realm.open(databaseOptions)
//       .then(realm => {
//         realm.write(() => {
//           let userFound = realm.objectForPrimaryKey(USER_SCHEMA, user.id);
//           userFound = user;
//         });
//       })
//       .catch(error => reject(error));
// });

// export const deleteUser = (user: User) =>
//   new Promise((resolve, reject) => {
//     Realm.open(databaseOptions)
//       .then(realm => {
//         realm.write(() => {
//           let userFound = realm.objectForPrimaryKey(USER_SCHEMA, user._id);
//           realm.delete(userFound);
//           resolve(userFound);
//         });
//       })
//       .catch(error => reject(error));
//   });

export const deleteFriendship = (friendshipId: number) =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let friendshipFound = realm.objectForPrimaryKey(
            FRINDSHIP_SCHEMA,
            friendshipId,
          );
          realm.delete(friendshipFound);
          resolve(friendshipFound);
        });
      })
      .catch(error => reject(error));
  });

export const deleteMessageDB = (message: Message) =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let messageFound = realm.objectForPrimaryKey(
            MESSAGE_SCHEMA,
            message.id,
          );
          realm.delete(messageFound);
          resolve(messageFound);
        });
      })
      .catch(error => reject(error));
  });

export const updateFriendShip = (
  friendship: FriendShip,
  status: UserCardType,
) =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let friendshipFound = realm.objectForPrimaryKey(
            FRINDSHIP_SCHEMA,
            friendship.id,
          ) as FriendShip;
          if (friendshipFound) {
            friendshipFound.status = status;
            resolve(friendshipFound);
          }
        });

        //realm.close();
      })
      .catch(error => reject(error));
  });

export const updateMessage = (message: Message, context: string) =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let messageFound = realm.objectForPrimaryKey(
            MESSAGE_SCHEMA,
            message.id,
          ) as Message;
          if (messageFound) {
            messageFound.message = context;
            messageFound.edited = true;
            resolve(messageFound);
          }
        });
      })
      .catch(error => reject(error));
  });

export const updateUser = (
  updatedUser: User,
  username: string,
  profilePic: string,
) =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let userFound = realm.objectForPrimaryKey(
            USER_SCHEMA,
            updatedUser.id,
          ) as User;
          if (userFound) {
            userFound.username = username;
            userFound.profilePic = profilePic;
            resolve(JSON.parse(JSON.stringify(userFound)));
          }
        });
      })
      .catch(error => reject(error));
  });
