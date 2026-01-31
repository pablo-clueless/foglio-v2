import type { UserProps } from "./user";

type MessageStatus = "SENT" | "DELIVERED" | "READ";

export interface Conversation {
  id: string;
  participant_1: string;
  participant_2: string;
  user_1: UserProps;
  user_2: UserProps;
  last_message?: Message;
  messages: Message[];
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  conversation?: Conversation;
  sender_id: string;
  sender: UserProps;
  recipient_id: string;
  recipient: UserProps;
  content: string;
  status: MessageStatus;
  read_at?: string;
  delivered_at?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export type MediaType = "IMAGE" | "VIDEO" | "AUDIO" | "DOCUMENT" | "FILE";

export interface MediaDto {
  id?: string;
  type: MediaType;
  url: string;
  file_name?: string;
  file_size?: number;
  mime_type?: string;
  width?: number;
  height?: number;
  duration?: number;
  thumbnail?: string;
}

export interface SendMessageDto {
  recipient_id: string;
  content: string;
  media?: MediaDto[];
}

export interface WebSocketSendMessageDto {
  action: "send_message" | "typing" | "stop_typing" | "mark_read";
  recipient_id?: string;
  content?: string;
  media?: MediaDto[];
  message_id?: string;
}

export interface UserSummary {
  id: string;
  name: string;
  username: string;
  image?: string;
}

export interface MessageResponse {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender?: UserSummary;
  recipient_id: string;
  recipient?: UserSummary;
  content: string;
  media?: MediaDto[];
  status: MessageStatus;
  read_at?: string;
  delivered_at?: string;
  created_at: string;
}

export interface ConversationResponse {
  id: string;
  other_user: UserSummary;
  last_message?: MessageResponse;
  unread_count: number;
  created_at: string;
  updated_at: string;
}

export interface ConversationListResponse {
  data: ConversationResponse[];
  total_items: number;
  total_pages: number;
  page: number;
  limit: number;
}

export interface MessageListResponse {
  data: MessageResponse[];
  total_items: number;
  total_pages: number;
  page: number;
  limit: number;
}

export interface ChatQueryParams {
  page?: number;
  limit?: number;
  before?: string; // Message ID to fetch messages before
  after?: string; // Message ID to fetch messages after
}

export interface WebSocketMessageEvent {
  type: "new_message" | "message_read" | "message_delivered" | "typing" | "stop_typing";
  message?: MessageResponse;
  user_id?: string;
  conversation_id?: string;
}

export interface WebSocketResponse {
  success: boolean;
  type: string;
  data?: Record<string, string>;
  error?: string;
}
