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
  current_password: string;
  new_password: string;
}

export interface ResetPasswordDto {
  current_password: string;
  new_password: string;
  token: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export interface SigninResponse {
  user: UserProps;
  token: string;
}
