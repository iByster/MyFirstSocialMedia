import {User} from '../databases/UserSchema';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Main: {
    user: User;
  };
  Chat: {
    senderId: number;
    receiverId: number;
  };
  EditProfile: {
    user: User;
  };
};
