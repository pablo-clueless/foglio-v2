import type { HttpResponse, NotificationProps, PaginatedParams, PaginatedResponse } from "@/types";
import { api } from "./api";

const notification = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<
      HttpResponse<PaginatedResponse<NotificationProps>>,
      PaginatedParams
    >({
      query: () => ({
        url: "",
        method: "",
      }),
    }),
    getNotification: builder.query<HttpResponse<NotificationProps>, string>({
      query: () => ({
        url: "",
        method: "",
      }),
    }),
    readNotifications: builder.query<HttpResponse<null>, string>({
      query: () => ({
        url: "",
        method: "",
      }),
    }),
    deleteNotification: builder.query<HttpResponse<null>, string>({
      query: () => ({
        url: "",
        method: "",
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
