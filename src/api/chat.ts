import type {
  HttpResponse,
  PaginatedParams,
  ConversationResponse,
  ConversationListResponse,
  MessageListResponse,
  SendMessageDto,
  MessageResponse,
} from "@/types";
import { api } from "./api";

export const chat = api.injectEndpoints({
  endpoints: (builder) => ({
    getOrCreateConversation: builder.query<HttpResponse<ConversationResponse>, string>({
      query: (userId) => ({
        url: `chat/conversations/user/${userId}`,
        method: "GET",
      }),
    }),
    getConversations: builder.query<HttpResponse<ConversationListResponse>, PaginatedParams>({
      query: (params) => ({
        url: `chat/conversations`,
        method: "GET",
        params,
      }),
    }),
    getConversation: builder.query<HttpResponse<ConversationResponse>, string>({
      query: (id) => ({
        url: `chat/conversations/${id}`,
        method: "GET",
      }),
    }),
    deleteConversation: builder.mutation<HttpResponse<null>, string>({
      query: (id) => ({
        url: `chat/conversations/${id}`,
        method: "DELETE",
      }),
    }),
    getMessagesInConversation: builder.query<
      HttpResponse<MessageListResponse>,
      { id: string; params: PaginatedParams }
    >({
      query: ({ id, params }) => ({
        url: `chat/conversations/${id}/messages`,
        method: "GET",
        params,
      }),
    }),
    sendMessage: builder.mutation<HttpResponse<MessageResponse>, SendMessageDto>({
      query: (payload) => ({
        url: `chat/messages`,
        method: "POST",
        body: payload,
      }),
    }),
    markMessageAsRead: builder.mutation<HttpResponse<null>, string>({
      query: (messageId) => ({
        url: `chat/messages/${messageId}/read`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useDeleteConversationMutation,
  useGetConversationQuery,
  useGetConversationsQuery,
  useGetMessagesInConversationQuery,
  useGetOrCreateConversationQuery,
  useLazyGetConversationsQuery,
  useLazyGetMessagesInConversationQuery,
  useLazyGetOrCreateConversationQuery,
  useSendMessageMutation,
  useMarkMessageAsReadMutation,
} = chat;
