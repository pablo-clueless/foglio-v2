import type { UserProps } from "./user";

export interface OAuthCallbackDto {
  code: string;
  state: string;
}

export interface OAuthUserDto {
  id: string;
  email: string;
  name: string;
  avatar: string;
  provider: string;
}

export interface SigninDto {
  email: string;
  password: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export interface ResetPasswordDto {
  confirmPassword: string;
  newPassword: string;
  token: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  username: string;
}

export interface SigninResponse {
  user: UserProps;
  token: string;
}
