import {IFriendShip, User} from '../App';

export const getUser = (userId: number, users: User[]) => {
  return users.find(user => user.id === userId);
};

export const getUsers = (userIds: IFriendShip[], users: User[]) => {
  //   const usersObj = userIds.map(userId => getUser(userId.friendId, users)!);
  //   return usersObj;
  const usersObj: User[] = [];
  userIds.forEach(user => {
    usersObj.push(getUser(user.friendId, users)!);
  });
  return usersObj;
};
