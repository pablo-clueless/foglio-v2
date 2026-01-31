import type {
  CreatePortfolioDto,
  CreatePortfolioSectionDto,
  HttpResponse,
  PortfolioProps,
  UpdatePortfolioDto,
} from "@/types";
import { api } from "./api";

export const portfolio = api.injectEndpoints({
  endpoints: (builder) => ({
    createPortfolio: builder.mutation<HttpResponse<PortfolioProps>, CreatePortfolioDto>({
      query: (payload) => ({
        url: `/portfolio`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Portfolio", "User"],
    }),
    getPortfolio: builder.query<HttpResponse<PortfolioProps>, null>({
      query: () => ({
        url: `/portfolio`,
        method: "GET",
      }),
      providesTags: ["Portfolio"],
    }),
    updatePortfolio: builder.mutation<HttpResponse<PortfolioProps>, UpdatePortfolioDto>({
      query: (payload) => ({
        url: `/portfolio`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Portfolio", "User"],
    }),
    deletePortfolio: builder.mutation<HttpResponse<PortfolioProps>, null>({
      query: () => ({
        url: `/portfolio`,
        method: "PUT",
      }),
      invalidatesTags: ["Portfolio", "User"],
    }),
    publishPortfolio: builder.mutation<HttpResponse<PortfolioProps>, null>({
      query: () => ({
        url: `/portfolio/publish`,
        method: "POST",
      }),
      invalidatesTags: ["Portfolio", "User"],
    }),
    unpublishPortfolio: builder.mutation<HttpResponse<PortfolioProps>, null>({
      query: () => ({
        url: `/portfolio/unpublish`,
        method: "POST",
      }),
      invalidatesTags: ["Portfolio", "User"],
    }),
    getPublicPortfolios: builder.mutation<HttpResponse<PortfolioProps>, string>({
      query: (slug) => ({
        url: `/portfolios/${slug}`,
        method: "POST",
      }),
      invalidatesTags: ["Portfolio", "User"],
    }),
    createPortfolioSection: builder.mutation<HttpResponse<PortfolioProps>, CreatePortfolioSectionDto>({
      query: (payload) => ({
        url: `/portfolio/sections`,
        method: "POST",
        body: payload,
      }),
    }),
    updatePortfolioSection: builder.mutation<
      HttpResponse<PortfolioProps>,
      { id: string; payload: Partial<CreatePortfolioSectionDto> }
    >({
      query: ({ id, payload }) => ({
        url: `/portfolio/sections/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),
    deletePortfolioSection: builder.mutation<HttpResponse<PortfolioProps>, string>({
      query: (id) => ({
        url: `/portfolio/sections/${id}`,
        method: "DELETE",
      }),
    }),
    reorderPortfolioSections: builder.mutation<HttpResponse<PortfolioProps>, { section_ids: string[] }>({
      query: (payload) => ({
        url: `/portfolio/sections/reorder`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useCreatePortfolioMutation,
  useCreatePortfolioSectionMutation,
  useDeletePortfolioMutation,
  useDeletePortfolioSectionMutation,
  useGetPortfolioQuery,
  usePublishPortfolioMutation,
  useUnpublishPortfolioMutation,
  useUpdatePortfolioMutation,
  useUpdatePortfolioSectionMutation,
} = portfolio;
