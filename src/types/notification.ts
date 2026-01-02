import type { UserProps } from "./user";

export interface NotificationProps {
  id: string;
  title: string;
  content: string;
  is_read: boolean;
  created_at: Date;
  updated_at: Date;
  owner_id: string;
  owner: UserProps;
}

export interface WsStatsProps {
  connected_clients: number;
  connected_users: number;
}
