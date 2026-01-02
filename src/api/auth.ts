import type { CreateUserDto, HttpResponse, ResetPasswordDto, SigninDto, SigninResponse, UserProps } from "@/types";
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
    github: builder.query<HttpResponse<string>, undefined>({
      query: () => ({
        url: "/auth/github",
        method: "GET",
      }),
    }),
    githubCallback: builder.query<HttpResponse<string>, undefined>({
      query: () => ({
        url: "/auth/github/callback",
        method: "GET",
      }),
    }),
    google: builder.query<HttpResponse<string>, undefined>({
      query: () => ({
        url: "/auth/google",
        method: "GET",
      }),
    }),
    googleCallback: builder.query<HttpResponse<string>, undefined>({
      query: () => ({
        url: "/auth/google/callback",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useForgotPasswordMutation,
  useGithubCallbackQuery,
  useGithubQuery,
  useGoogleCallbackQuery,
  useGoogleQuery,
  useResetPasswordMutation,
  useSigninMutation,
  useSignupMutation,
  useVerificationMutation,
} = auth;
