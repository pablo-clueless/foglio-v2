import type {
  HttpResponse,
  PaginatedParams,
  PaginatedResponse,
  SubscriptionProps,
  UserSubscriptionProps,
} from "@/types";
import { removeNullorUndefined } from "@/lib";
import { api } from "./api";

export const subscription = api.injectEndpoints({
  endpoints: (builder) => ({
    createSubscription: builder.mutation<HttpResponse<PaginatedResponse<SubscriptionProps>>, SubscriptionProps>({
      query: () => ({
        url: "/subscriptions",
        method: "POST",
        body: {},
      }),
    }),
    getSubscriptions: builder.query<HttpResponse<PaginatedResponse<SubscriptionProps>>, PaginatedParams>({
      query: () => ({
        url: "/subscriptions",
        method: "GET",
      }),
    }),
    getSubscription: builder.query<HttpResponse<SubscriptionProps>, string>({
      query: (id) => ({
        url: `/subscriptions/${id}`,
        method: "GET",
      }),
    }),
    updateSubscriptions: builder.query<HttpResponse<SubscriptionProps>, string>({
      query: () => ({
        url: "/subscriptions/read",
        method: "PUT",
      }),
    }),
    deleteSubscription: builder.query<HttpResponse<SubscriptionProps>, string>({
      query: (id) => ({
        url: `/subscriptions/${id}`,
        method: "DELETE",
      }),
    }),
    // user subscription
    getUserSubscriptions: builder.query<HttpResponse<PaginatedResponse<UserSubscriptionProps>>, PaginatedParams>({
      query: (params) => ({
        url: `/user/subscriptions`,
        method: "GET",
        params: removeNullorUndefined(params),
      }),
    }),
    getUserSubscription: builder.query<HttpResponse<UserSubscriptionProps>, string>({
      query: (id) => ({
        url: `/user/subscriptions/${id}`,
        method: "GET",
      }),
    }),
    subscribe: builder.query<HttpResponse<UserSubscriptionProps>, string>({
      query: (id) => ({
        url: `/user/subscriptions/${id}/subscribe`,
        method: "POST",
      }),
    }),
    unsubscribe: builder.query<HttpResponse<UserSubscriptionProps>, null>({
      query: () => ({
        url: `/user/subscriptions/unsubscribe`,
        method: "DELETE",
      }),
    }),
    upgradeSubscription: builder.query<HttpResponse<UserSubscriptionProps>, string>({
      query: (id) => ({
        url: `/user/subscriptions/${id}/upgrade`,
        method: "PUT",
      }),
    }),
    downgradeSubscription: builder.query<HttpResponse<UserSubscriptionProps>, string>({
      query: (id) => ({
        url: `/user/subscriptions/${id}/downgrade`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useCreateSubscriptionMutation,
  useDeleteSubscriptionQuery,
  useDowngradeSubscriptionQuery,
  useGetSubscriptionQuery,
  useGetSubscriptionsQuery,
  useGetUserSubscriptionQuery,
  useGetUserSubscriptionsQuery,
  useSubscribeQuery,
  useUnsubscribeQuery,
  useUpdateSubscriptionsQuery,
  useUpgradeSubscriptionQuery,
} = subscription;
