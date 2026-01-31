import type {
  HttpResponse,
  NotificationProps,
  NotificationSettingsResponse,
  PaginatedParams,
  PaginatedResponse,
  UpdateNotificationSettingsDto,
} from "@/types";
import { api } from "./api";

export const notification = api.injectEndpoints({
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
    getNotificationSettings: builder.query<HttpResponse<NotificationSettingsResponse>, null>({
      query: () => ({
        url: `/notification-settings`,
        method: "GET",
      }),
    }),
    updateNotificationSettings: builder.mutation<
      HttpResponse<NotificationSettingsResponse>,
      UpdateNotificationSettingsDto
    >({
      query: (payload) => ({
        url: `/notification-settings`,
        method: "PUT",
        body: payload,
      }),
    }),
  }),
});

export const {
  useDeleteNotificationQuery,
  useGetNotificationQuery,
  useGetNotificationSettingsQuery,
  useGetNotificationsQuery,
  useReadNotificationsQuery,
  useUpdateNotificationSettingsMutation,
} = notification;
