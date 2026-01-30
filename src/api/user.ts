import { toast } from "sonner";

import type { HttpError, HttpResponse, PaginatedParams, PaginatedResponse, UpdateUserDto, UserProps } from "@/types";
import { removeNullorUndefined } from "@/lib";
import { useUserStore } from "@/store/user";
import { api } from "./api";

export interface UserPagination {
  query?: string;
  user_type?: "recruiter" | "talent";
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
      providesTags: ["User"],
    }),
    updateUser: builder.mutation<HttpResponse<UserProps>, { id: string; payload: Partial<UpdateUserDto> }>({
      query: ({ id, payload }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["User"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          useUserStore.getState().setUser(data.data);
        } catch (error) {
          console.error({ error });
          const message = (error as HttpError).data.message || "Error updating user";
          toast.error(message);
        }
      },
    }),
    updateUserImage: builder.mutation<HttpResponse<UserProps>, { id: string; avatar: File }>({
      query: ({ id, avatar }) => {
        const formData = new FormData();
        formData.append("avatar", avatar);

        return {
          url: `/users/${id}/avatar`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["User"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          useUserStore.getState().setUser(data.data);
        } catch (error) {
          console.error({ error });
          const message = (error as HttpError).data.message || "Error updating user";
          toast.error(message);
        }
      },
    }),
    deleteUser: builder.mutation<HttpResponse<null>, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useDeleteUserMutation,
  useGetMeQuery,
  useGetUserQuery,
  useGetUsersQuery,
  useUpdateUserImageMutation,
  useUpdateUserMutation,
} = user;
