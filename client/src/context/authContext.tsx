import { createContext, useContext, useState } from 'react';
import { useMeQuery } from '../generated/graphql';

type Props = {
  children: React.ReactNode;
};

interface IAuth {
  username: string;
  email: string;
  id: number;
}

interface AuthContextInterface {
  userProfile?: IAuth;
  loginContext(userProfile: IAuth): void;
  logoutContext(): void;
}

export const AuthContext = createContext<AuthContextInterface>({
  logoutContext() {},
  loginContext(_userProfile: IAuth) {},
});

export function useAuthContext() {
  return useContext(AuthContext);
}

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [accessToken, setAccessToken] = useState();
  const [userProfile, setUserProfile] = useState<IAuth>({
    username: '',
    email: '',
    id: -1,
  });

  function loginContext(userProfile: IAuth) {
    // setAccessToken(accessToken);
    setUserProfile(userProfile);
    console.log(`user: ${userProfile.username} logged in ${userProfile}`);
  }

  function logoutContext() {
    loginContext({
      username: '',
      email: '',
      id: -1,
    });
  }

  return (
    <AuthContext.Provider value={{ userProfile, loginContext, logoutContext }}>
      {children}
    </AuthContext.Provider>
  );
};
