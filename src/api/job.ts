import { removeNullorUndefined } from "@/lib";
import { api } from "./api";
import type {
  ApplyToJobDto,
  CreateJobDto,
  HttpResponse,
  JobApplicationProps,
  JobProps,
  PaginatedParams,
  PaginatedResponse,
  UpdateJobDto,
} from "@/types";

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
    getJobs: builder.query<HttpResponse<PaginatedResponse<JobProps>>, PaginatedParams & JobPagination>({
      query: (params) => ({
        url: "/jobs",
        method: "GET",
        params: removeNullorUndefined(params),
      }),
    }),
    getJobsByUser: builder.query<HttpResponse<PaginatedResponse<JobProps>>, PaginatedParams & JobPagination>({
      query: (params) => ({
        url: "/me/jobs",
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
    getApplications: builder.query<HttpResponse<PaginatedResponse<JobApplicationProps>>, PaginatedParams>({
      query: (params) => ({
        url: "/jobs/applications/user",
        method: "GET",
        params: removeNullorUndefined(params),
      }),
    }),
  }),
});

export const {
  useApplyToJobMutation,
  useCreateJobMutation,
  useDeleteJobMutation,
  useGetApplicationsQuery,
  useGetJobQuery,
  useGetJobsByUserQuery,
  useGetJobsQuery,
  useUpdateJobMutation,
} = job;
