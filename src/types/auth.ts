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
  identifier: string;
  password: string;
}

export interface ChangePasswordDto {
  current_password: string;
  new_password: string;
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
  requires_two_factor: boolean;
  token: string;
  user: UserProps;
  user_id?: string;
}

export type VerificationType = "DRIVERS_LICENSE" | "INTERNATIONAL_PASSPORT" | "NATIONAL_ID_CARD" | "VOTERS_CARD";

export interface VerificationDto {
  verification_number: string;
  verification_type: VerificationType;
  verification_document: string;
}

export interface Verify2FASetupRequestDto {
  code: string;
}

export interface Verify2FALoginRequestDto {
  user_id: string;
  code: string;
}

export interface Disable2FARequestDto {
  password: string;
}

export interface Enable2FAResponseDto {
  secret: string;
  qr_code_url: string;
  backup_codes: string[];
}

export interface TwoFactorRequiredResponseDto {
  requires_two_factor: boolean;
  user_id: string;
  message: string;
}

export interface TwoFactorStatusResponseDto {
  enabled: string;
  backup_codes_left: number;
}

export interface BackupCodesResponseDto {
  backup_codes: string[];
  message: string;
}
