export interface UserLoginPayload {
  usernameOrEmail: string;
  password: string;
}

export interface UserRegisterPayload {
  username: string;
  password: string;
  email: string;
}
