export interface UserRegisterPayload {
  username: string;
  password: string;
  email: string;
}

export interface UserLoginPayload {
  usernameOrEmail: string;
  password: string;
}

export interface UserChangePasswordPayload {
  newPassword: string;
  confNewPassword: string;
}
