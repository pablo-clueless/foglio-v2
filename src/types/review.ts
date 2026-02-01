import type { UserProps } from "./user";

export interface ReviewProps {
  id: string;
  rating: number; // 1–5
  comment: string;
  user_id: string;
  user: UserProps;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface ReviewDto {
  rating: number; // 1–5
  comment: string;
}
