import type {
  CreateUserDto,
  HttpResponse,
  ResetPasswordDto,
  SigninDto,
  SigninResponse,
  UserProps,
} from "@/types";
import { api } from "./api";

const auth = api.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<HttpResponse<UserProps>, CreateUserDto>({
      query: () => ({
        url: "/auth/signup",
        method: "POST",
      }),
    }),
    signin: builder.mutation<HttpResponse<SigninResponse>, SigninDto>({
      query: () => ({
        url: "/auth/signin",
        method: "POST",
      }),
    }),
    verification: builder.mutation<HttpResponse<string>, string>({
      query: () => ({
        url: "/auth/verification",
        method: "POST",
      }),
    }),
    forgotPassword: builder.mutation<HttpResponse<string>, { email: string }>({
      query: (email) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: email,
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
} = auth;
