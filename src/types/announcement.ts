import type { UserProps } from "./user";

type AnnouncementType = "ANNOUNCEMENT" | "APP_UPDATE" | "SYSTEM_ALERT" | "MAINTENANCE";
type TargetAudience = "ALL_USERS" | "ADMINS_ONLY" | "RECRUITERS_ONLY" | "PREMIUM_ONLY";
type AnnouncementPriority = "LOW" | "NORMAL" | "HIGH" | "CRITICAL";

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: AnnouncementType;
  target_audience: TargetAudience;
  priority: AnnouncementPriority;
  show_as_banner: boolean;
  banner_color?: string;
  action_url?: string;
  action_text?: string;
  scheduled_at?: Date;
  expires_at?: Date;
  is_published: boolean;
  published_at?: Date;
  metadata?: Record<string, unknown>;
  created_by: string;
  created_by_user?: UserProps;
  user_statuses?: UserAnnouncementStatus[];
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface UserAnnouncementStatus {
  id: string;
  user_id: string;
  user?: UserProps;
  announcement_id: string;
  announcement?: Announcement;
  is_read: boolean;
  read_at?: Date;
  is_dismissed: boolean;
  dismissed_at?: Date;
  created_at: Date;
  updated_at: Date;
}
