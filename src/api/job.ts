import type {
  ApplyToJobDto,
  CreateJobDto,
  HttpResponse,
  JobProps,
  PaginatedParams,
  PaginatedResponse,
  UpdateJobDto,
} from "@/types";
import { api } from "./api";
import { removeNullorUndefined } from "@/lib";

export interface JobPagination {
  company?: string;
  location?: string;
  salary?: string;
  posted_date?: string;
  employment_type?: string;
  requirement?: string;
  is_remote?: boolean;
}

const job = api.injectEndpoints({
  endpoints: (builder) => ({
    createJob: builder.mutation<HttpResponse<JobProps>, CreateJobDto>({
      query: (payload) => ({
        url: "/jobs",
        method: "POST",
        body: payload,
      }),
    }),
    getJobs: builder.query<
      HttpResponse<PaginatedResponse<JobProps>>,
      PaginatedParams & JobPagination
    >({
      query: (params) => ({
        url: "/jobs",
        method: "GET",
        params: removeNullorUndefined(params),
      }),
    }),
    getJob: builder.query<HttpResponse<JobProps>, string>({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: "GET",
      }),
    }),
    updateJob: builder.mutation<HttpResponse<JobProps>, { id: string; payload: UpdateJobDto }>({
      query: ({ id, payload }) => ({
        url: `/jobs/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),
    deleteJob: builder.mutation<HttpResponse<null>, string>({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: "DELETE",
      }),
    }),
    applyToJob: builder.mutation<HttpResponse<null>, ApplyToJobDto>({
      query: () => ({
        url: "/jobs",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useApplyToJobMutation,
  useCreateJobMutation,
  useDeleteJobMutation,
  useGetJobQuery,
  useGetJobsQuery,
} = job;
