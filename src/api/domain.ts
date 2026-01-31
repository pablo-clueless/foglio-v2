import type { DomainProps, DomainVerificationResponse, HttpResponse, SubdomainAvailabilityProps } from "@/types";
import { api } from "./api";

export interface UpdateSubdomainPayload {
  subdomain: string;
}

export interface SetCustomDomainPayload {
  custom_domain: string;
}

export const domain = api.injectEndpoints({
  endpoints: (builder) => ({
    getDomain: builder.query<HttpResponse<DomainProps>, null>({
      query: () => ({
        url: `/domain`,
        method: "GET",
      }),
      providesTags: ["Domain"],
    }),
    checkDomain: builder.query<HttpResponse<SubdomainAvailabilityProps>, string>({
      query: (subdomain) => ({
        url: `/domain/check/${subdomain}`,
        method: "GET",
      }),
      providesTags: ["Domain"],
    }),
    claimSubdomain: builder.mutation<HttpResponse<DomainProps>, UpdateSubdomainPayload>({
      query: (payload) => ({
        url: `/domain/subdomain`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Domain", "User"],
    }),
    updateSubdomain: builder.mutation<HttpResponse<DomainProps>, UpdateSubdomainPayload>({
      query: (payload) => ({
        url: `/domain/subdomain`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Domain", "User"],
    }),
    setDomain: builder.mutation<HttpResponse<DomainProps>, SetCustomDomainPayload>({
      query: (payload) => ({
        url: `/domain/custom`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Domain", "User"],
    }),
    verifyCustomDomain: builder.mutation<HttpResponse<DomainVerificationResponse>, null>({
      query: () => ({
        url: `/domain/custom/verify`,
        method: "POST",
      }),
      invalidatesTags: ["Domain", "User"],
    }),
    removeCustomDomain: builder.mutation<HttpResponse<null>, null>({
      query: () => ({
        url: `/domain/custom`,
        method: "DELETE",
      }),
      invalidatesTags: ["Domain", "User"],
    }),
  }),
});

export const {
  useCheckDomainQuery,
  useLazyCheckDomainQuery,
  useClaimSubdomainMutation,
  useGetDomainQuery,
  useRemoveCustomDomainMutation,
  useSetDomainMutation,
  useUpdateSubdomainMutation,
  useVerifyCustomDomainMutation,
} = domain;
