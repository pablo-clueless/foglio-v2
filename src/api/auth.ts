import type {
  BackupCodesResponseDto,
  ChangePasswordDto,
  CreateUserDto,
  Disable2FARequestDto,
  Enable2FAResponseDto,
  HttpResponse,
  ResetPasswordDto,
  SigninDto,
  SigninResponse,
  TwoFactorStatusResponseDto,
  UserProps,
  Verify2FALoginRequestDto,
  Verify2FASetupRequestDto,
} from "@/types";
import { api } from "./api";

const auth = api.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<HttpResponse<UserProps>, CreateUserDto>({
      query: (payload) => ({
        url: "/auth/signup",
        method: "POST",
        body: payload,
      }),
    }),
    signin: builder.mutation<HttpResponse<SigninResponse>, SigninDto>({
      query: (payload) => ({
        url: "/auth/signin",
        method: "POST",
        body: payload,
      }),
    }),
    verification: builder.mutation<HttpResponse<SigninResponse>, string>({
      query: (otp) => ({
        url: "/auth/verification",
        method: "POST",
        body: { otp },
      }),
    }),
    forgotPassword: builder.mutation<HttpResponse<string>, string>({
      query: (email) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: builder.mutation<HttpResponse<string>, ResetPasswordDto>({
      query: (payload) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: payload,
      }),
    }),
    updatePassword: builder.mutation<HttpResponse<string>, ChangePasswordDto>({
      query: (payload) => ({
        url: "/auth/update-password",
        method: "POST",
        body: payload,
      }),
    }),
    github: builder.query<HttpResponse<string>, null>({
      query: () => ({
        url: "/auth/github",
        method: "GET",
      }),
    }),
    githubCallback: builder.query<HttpResponse<string>, null>({
      query: () => ({
        url: "/auth/github/callback",
        method: "GET",
      }),
    }),
    google: builder.query<HttpResponse<string>, null>({
      query: () => ({
        url: "/auth/google",
        method: "GET",
      }),
    }),
    googleCallback: builder.query<HttpResponse<string>, null>({
      query: () => ({
        url: "/auth/google/callback",
        method: "GET",
      }),
    }),
    setupTwoFactor: builder.mutation<HttpResponse<Enable2FAResponseDto>, null>({
      query: () => ({
        url: `/auth/2fa/setup`,
        method: "POST",
      }),
    }),
    verifySetupTwoFactor: builder.mutation<HttpResponse<unknown>, Verify2FASetupRequestDto>({
      query: (payload) => ({
        url: `/auth/2fa/verify-setup`,
        method: "POST",
        body: payload,
      }),
    }),
    verifyTwoFactor: builder.mutation<HttpResponse<SigninResponse>, Verify2FALoginRequestDto>({
      query: (payload) => ({
        url: `/auth/2fa/verify`,
        method: "POST",
        body: payload,
      }),
    }),
    disableTwoFactor: builder.mutation<HttpResponse<unknown>, Disable2FARequestDto>({
      query: (payload) => ({
        url: `/auth/2fa/disable`,
        method: "POST",
        body: payload,
      }),
    }),
    getTwoFactorBackupCodes: builder.mutation<HttpResponse<BackupCodesResponseDto>, string>({
      query: (password) => ({
        url: `/auth/2fa/backup-codes`,
        method: "POST",
        body: { password },
      }),
    }),
    getTwoFactorStatus: builder.query<HttpResponse<TwoFactorStatusResponseDto>, null>({
      query: () => ({
        url: `/auth/2fa/status`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useForgotPasswordMutation,
  useDisableTwoFactorMutation,
  useGetTwoFactorBackupCodesMutation,
  useGetTwoFactorStatusQuery,
  useGithubCallbackQuery,
  useGithubQuery,
  useGoogleCallbackQuery,
  useGoogleQuery,
  useLazyGithubQuery,
  useLazyGoogleQuery,
  useResetPasswordMutation,
  useSetupTwoFactorMutation,
  useSigninMutation,
  useSignupMutation,
  useUpdatePasswordMutation,
  useVerificationMutation,
  useVerifySetupTwoFactorMutation,
  useVerifyTwoFactorMutation,
} = auth;
