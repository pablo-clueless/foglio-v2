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

export const job = api.injectEndpoints({
  endpoints: (builder) => ({
    createJob: builder.mutation<HttpResponse<JobProps>, CreateJobDto>({
      query: (payload) => ({
        url: "/jobs",
        method: "POST",
        body: payload,
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
    getJobs: builder.query<HttpResponse<PaginatedResponse<JobProps>>, PaginatedParams & JobPagination>({
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
    getJobsByUser: builder.query<HttpResponse<PaginatedResponse<JobProps>>, PaginatedParams & JobPagination>({
      query: (params) => ({
        url: "/me/jobs",
        method: "GET",
        params: removeNullorUndefined(params),
      }),
    }),
    applyToJob: builder.mutation<HttpResponse<null>, ApplyToJobDto>({
      query: () => ({
        url: "/jobs",
        method: "POST",
      }),
    }),
    addCommentOnJob: builder.mutation<HttpResponse<JobProps>, { content: string; id: string }>({
      query: ({ content, id }) => ({
        url: `/jobs/${id}/comment`,
        method: "POST",
        body: { content },
      }),
    }),
    deleteCommentOnJob: builder.mutation<HttpResponse<JobProps>, string>({
      query: (id) => ({
        url: `/jobs/${id}/comment`,
        method: "DELETE",
      }),
    }),
    addReactionOnJob: builder.mutation<HttpResponse<JobProps>, { id: string; reaction: "DISLIKE" | "LIKE" }>({
      query: ({ id, reaction }) => ({
        url: `/jobs/${id}/reaction/${reaction}`,
        method: "POST",
      }),
    }),
    deleteReactionOnJob: builder.mutation<HttpResponse<JobProps>, string>({
      query: (id) => ({
        url: `/jobs/${id}/reaction`,
        method: "DELETE",
      }),
    }),
    getApplicationsForJob: builder.query<
      HttpResponse<PaginatedResponse<JobApplicationProps>>,
      { id: string; params: PaginatedParams }
    >({
      query: ({ id, params }) => ({
        url: `/jobs/applications/job/${id}`,
        method: "GET",
        params: removeNullorUndefined(params),
      }),
    }),
    getApplicationsForUser: builder.query<HttpResponse<PaginatedResponse<JobApplicationProps>>, PaginatedParams>({
      query: (params) => ({
        url: "/jobs/applications/user",
        method: "GET",
        params: removeNullorUndefined(params),
      }),
    }),
    getApplicationsForRecruiter: builder.query<
      HttpResponse<PaginatedResponse<JobApplicationProps>>,
      PaginatedParams & {
        status?: string;
        submission_date?: string;
      }
    >({
      query: (params) => ({
        url: "/jobs/applications/recruiter",
        method: "GET",
        params: removeNullorUndefined(params),
      }),
    }),
    getApplications: builder.query<HttpResponse<PaginatedResponse<JobApplicationProps>>, PaginatedParams>({
      query: (params) => ({
        url: "/jobs/applications",
        method: "GET",
        params: removeNullorUndefined(params),
      }),
    }),
    getApplication: builder.query<HttpResponse<JobApplicationProps>, string>({
      query: (id) => ({
        url: `/jobs/applications/${id}`,
        method: "GET",
      }),
    }),
    acceptApplication: builder.mutation<HttpResponse<JobApplicationProps>, { id: string; reason: string }>({
      query: ({ id, reason }) => ({
        url: `/jobs/application/${id}/accept`,
        method: "POST",
        body: { reason },
      }),
    }),
    rejectApplication: builder.mutation<HttpResponse<JobApplicationProps>, { id: string; reason: string }>({
      query: ({ id, reason }) => ({
        url: `/jobs/application/${id}/reject`,
        method: "POST",
        body: { reason },
      }),
    }),
  }),
});

export const {
  useAcceptApplicationMutation,
  useAddCommentOnJobMutation,
  useAddReactionOnJobMutation,
  useApplyToJobMutation,
  useCreateJobMutation,
  useDeleteCommentOnJobMutation,
  useDeleteJobMutation,
  useDeleteReactionOnJobMutation,
  useGetApplicationQuery,
  useGetApplicationsForJobQuery,
  useGetApplicationsForRecruiterQuery,
  useGetApplicationsForUserQuery,
  useGetApplicationsQuery,
  useGetJobQuery,
  useGetJobsByUserQuery,
  useGetJobsQuery,
  useRejectApplicationMutation,
  useUpdateJobMutation,
} = job;
