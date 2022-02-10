import {User} from '../databases/UserSchema';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Main: {
    user: User;
  };
  Chat: {
    sender: User;
    receiver: User;
  };
  EditProfile: {
    user: User;
  };
};
