import { removeNullorUndefined } from "@/lib";
import { api } from "./api";
import type {
  HttpResponse,
  InitializePaymentDto,
  InitializePaymentResponse,
  InvoiceProps,
  PaginatedParams,
  PaginatedResponse,
  PaymentMethodProps,
} from "@/types";

export const payment = api.injectEndpoints({
  endpoints: (builder) => ({
    initializePayment: builder.mutation<HttpResponse<InitializePaymentResponse>, InitializePaymentDto>({
      query: () => ({
        url: "/payments/initialize",
        method: "POST",
      }),
    }),
    verifyPayment: builder.query<HttpResponse<unknown>, { reference: string }>({
      query: (params) => ({
        url: "/payments/verify",
        method: "GET",
        params,
      }),
    }),
    cancelPayment: builder.mutation<HttpResponse<unknown>, unknown>({
      query: () => ({
        url: "/payments/cancel",
        method: "DELETE",
      }),
    }),
    webhookPayment: builder.mutation<HttpResponse<unknown>, string>({
      query: (signature) => ({
        url: "/payments/webhook",
        method: "POST",
        headers: {
          "x-paystack-signature": signature,
        },
      }),
    }),
    addPaymentMethod: builder.mutation<HttpResponse<InitializePaymentResponse>, string>({
      query: (callback_url) => ({
        url: "/payments/methods",
        method: "POST",
        body: { callback_url },
      }),
      invalidatesTags: ["Payment-Method"],
    }),
    getPaymentMethods: builder.query<HttpResponse<PaymentMethodProps[]>, null>({
      query: () => ({
        url: "/payments/methods",
        method: "GET",
      }),
      providesTags: ["Payment-Method"],
    }),
    removePayment: builder.mutation<HttpResponse<PaymentMethodProps>, string>({
      query: (authCode) => ({
        url: `/payments/methods/${authCode}`,
        method: "DELETE",
      }),
    }),
    getInvoices: builder.query<HttpResponse<PaginatedResponse<InvoiceProps>>, PaginatedParams>({
      query: (params) => ({
        url: "/payments/invoices",
        method: "GET",
        params: removeNullorUndefined(params),
      }),
    }),
    getInvoice: builder.query<HttpResponse<InvoiceProps>, string>({
      query: (id) => ({
        url: `/payments/invoices/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddPaymentMethodMutation,
  useCancelPaymentMutation,
  useGetInvoiceQuery,
  useGetInvoicesQuery,
  useGetPaymentMethodsQuery,
  useInitializePaymentMutation,
  useRemovePaymentMutation,
  useVerifyPaymentQuery,
  useWebhookPaymentMutation,
} = payment;
