import type { UserProps } from "./user";

export type NotificationType =
  | "APPLICATION_SUBMITTED"
  | "APPLICATION_ACCEPTED"
  | "APPLICATION_REJECTED"
  | "NEW_MESSAGE"
  | "SYSTEM";

export interface NotificationProps {
  id: string;
  title: string;
  content: string;
  type: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
  owner_id: string;
  owner: UserProps;
  data: Record<string, string>;
}

export interface WsStatsProps {
  connected_clients: number;
  connected_users: number;
}

export interface UpdateEmailSettingsDto {
  app_updates: boolean;
  new_messages: boolean;
  job_recommendations: boolean;
  newsletter: boolean;
  marketing_emails: boolean;
}

export interface UpdatePushSettingsDto {
  app_updates: boolean;
  new_messages: boolean;
  reminders: boolean;
}

export interface UpdateInAppSettingsDto {
  activity_updates: boolean;
  mentions: boolean;
  announcements: boolean;
}

export interface UpdateNotificationSettingsDto {
  email: UpdateEmailSettingsDto;
  push: UpdatePushSettingsDto;
  in_app: UpdateInAppSettingsDto;
}

export interface EmailNotificationSettings {
  app_updates: boolean;
  new_messages: boolean;
  job_recommendations: boolean;
  newsletter: boolean;
  marketing_emails: boolean;
}

export interface PushNotificationSettings {
  app_updates: boolean;
  new_messages: boolean;
  reminders: boolean;
}

export interface InAppNotificationSettings {
  activity_updates: boolean;
  mentions: boolean;
  announcements: boolean;
}

export interface NotificationSettings {
  id: string;
  user_id: string;
  email: EmailNotificationSettings;
  push: PushNotificationSettings;
  in_app: InAppNotificationSettings;
  created_at: string;
  updated_at: string;
}

export interface NotificationSettingsResponse {
  id: string;
  email: EmailNotificationSettings;
  push: PushNotificationSettings;
  in_app: InAppNotificationSettings;
}
