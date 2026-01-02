import type { HttpResponse, NotificationProps, PaginatedParams, PaginatedResponse } from "@/types";
import { api } from "./api";

const notification = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<HttpResponse<PaginatedResponse<NotificationProps>>, PaginatedParams>({
      query: () => ({
        url: "/notifications",
        method: "GET",
      }),
    }),
    getNotification: builder.query<HttpResponse<NotificationProps>, string>({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: "GET",
      }),
    }),
    readNotifications: builder.query<HttpResponse<null>, string>({
      query: () => ({
        url: "/notifications/read",
        method: "POST",
      }),
    }),
    deleteNotification: builder.query<HttpResponse<null>, string>({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useDeleteNotificationQuery,
  useGetNotificationQuery,
  useGetNotificationsQuery,
  useReadNotificationsQuery,
} = notification;
