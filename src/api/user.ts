import type { HttpResponse, PaginatedParams, PaginatedResponse, UpdateUserDto, UserProps } from "@/types";
import { removeNullorUndefined } from "@/lib";
import { api } from "./api";

export interface UserPagination {
  username?: string;
  language?: string;
  location?: string;
  skill?: string;
}

export const user = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<HttpResponse<PaginatedResponse<UserProps>>, PaginatedParams & UserPagination>({
      query: (params) => ({
        url: "/users",
        method: "GET",
        params: removeNullorUndefined(params),
      }),
    }),
    getUser: builder.query<HttpResponse<UserProps>, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
    }),
    getMe: builder.query<HttpResponse<UserProps>, undefined>({
      query: () => ({
        url: "/me",
        method: "GET",
      }),
    }),
    updateUser: builder.mutation<HttpResponse<UserProps>, { id: string; payload: Partial<UpdateUserDto> }>({
      query: ({ id, payload }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),
    deleteUser: builder.mutation<HttpResponse<null>, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useDeleteUserMutation, useGetMeQuery, useGetUserQuery, useGetUsersQuery, useUpdateUserMutation } = user;
