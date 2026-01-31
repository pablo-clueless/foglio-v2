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
