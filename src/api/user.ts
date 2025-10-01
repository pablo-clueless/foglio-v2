import type { HttpResponse, PaginatedParams, PaginatedResponse, UserProps } from "@/types";
import { api } from "./api";
import { removeNullorUndefined } from "@/lib";

export interface UserPagination {
  username?: string;
  language?: string;
  location?: string;
  skill?: string;
}

const user = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<
      HttpResponse<PaginatedResponse<UserProps>>,
      PaginatedParams & UserPagination
    >({
      query: (params) => ({
        url: "/users",
        method: "GET",
        params: removeNullorUndefined(params),
      }),
    }),
    getUser: builder.query<HttpResponse<PaginatedResponse<UserProps>>, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
    }),
    updateUser: builder.query<HttpResponse<PaginatedResponse<UserProps>>, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "PUT",
      }),
    }),
    deleteUser: builder.query<HttpResponse<PaginatedResponse<null>>, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useDeleteUserQuery, useGetUserQuery, useGetUsersQuery, useUpdateUserQuery } = user;
