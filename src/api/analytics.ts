import { api } from "./api";
import type {
  AdminDashboardAnalytics,
  AnalyticsDto,
  AnalyticsDtoWithGroup,
  ApplicationStatsResponse,
  HttpResponse,
  JobStatsResponse,
  PlatformOverview,
  PortfolioStatsResponse,
  ProfileViewsStats,
  RecruiterAnalytics,
  RevenueStatsResponse,
  TalentAnalytics,
  TalentApplicationStats,
  TrackEventDto,
  TrackJobViewDto,
  TrackPageViewDto,
  TrackPortfolioViewDto,
  TrackProfileViewDto,
  UserStatsResponse,
  ViewerInsightsResponse,
} from "@/types";

export const analytics = api.injectEndpoints({
  endpoints: (builder) => ({
    trackPageView: builder.mutation<HttpResponse<unknown>, TrackPageViewDto>({
      query: (payload) => ({
        url: `/analytics/track/page-view`,
        method: "POST",
        body: payload,
      }),
    }),
    trackJobView: builder.mutation<HttpResponse<unknown>, TrackJobViewDto>({
      query: (payload) => ({
        url: `/analytics/track/job-view`,
        method: "POST",
        body: payload,
      }),
    }),
    trackProfileView: builder.mutation<HttpResponse<unknown>, TrackProfileViewDto>({
      query: (payload) => ({
        url: `/analytics/track/profile-view`,
        method: "POST",
        body: payload,
      }),
    }),
    trackPortfolioView: builder.mutation<HttpResponse<unknown>, TrackPortfolioViewDto>({
      query: (payload) => ({
        url: `/analytics/track/portfolio-view`,
        method: "POST",
        body: payload,
      }),
    }),
    trackEvent: builder.mutation<HttpResponse<unknown>, TrackEventDto>({
      query: (payload) => ({
        url: `/analytics/track/event`,
        method: "POST",
        body: payload,
      }),
    }),
    adminDashboard: builder.query<HttpResponse<AdminDashboardAnalytics>, AnalyticsDtoWithGroup>({
      query: () => ({
        url: `/analytics/admin/dashboard`,
        method: "GET",
      }),
    }),
    adminOverview: builder.query<HttpResponse<PlatformOverview>, null>({
      query: () => ({
        url: `/analytics/admin/overview`,
        method: "GET",
      }),
    }),
    adminUsers: builder.query<HttpResponse<UserStatsResponse>, AnalyticsDto>({
      query: () => ({
        url: `/analytics/admin/users`,
        method: "GET",
      }),
    }),
    adminJobs: builder.query<HttpResponse<JobStatsResponse>, AnalyticsDto>({
      query: () => ({
        url: `/analytics/admin/jobs`,
        method: "GET",
      }),
    }),
    adminApplications: builder.query<HttpResponse<ApplicationStatsResponse>, AnalyticsDto>({
      query: () => ({
        url: `/analytics/admin/applications`,
        method: "GET",
      }),
    }),
    adminRevenue: builder.query<HttpResponse<RevenueStatsResponse>, AnalyticsDto>({
      query: () => ({
        url: `/analytics/admin/revenue`,
        method: "GET",
      }),
    }),
    recruiterDashboard: builder.query<HttpResponse<RecruiterAnalytics>, AnalyticsDtoWithGroup>({
      query: () => ({
        url: `/analytics/recruiter/dashboard`,
        method: "GET",
      }),
    }),
    recruiterJobs: builder.query<HttpResponse<JobStatsResponse>, AnalyticsDto>({
      query: () => ({
        url: `/analytics/recruiter/jobs`,
        method: "GET",
      }),
    }),
    recruiterApplications: builder.query<HttpResponse<ApplicationStatsResponse>, null>({
      query: () => ({
        url: `/analytics/recruiter/applications`,
        method: "GET",
      }),
    }),
    talentDashboard: builder.query<HttpResponse<TalentAnalytics>, AnalyticsDtoWithGroup>({
      query: () => ({
        url: `/analytics/talent/dashboard`,
        method: "GET",
      }),
    }),
    talentProfileViews: builder.query<HttpResponse<ProfileViewsStats>, AnalyticsDto>({
      query: () => ({
        url: `/analytics/talent/profile-views`,
        method: "GET",
      }),
    }),
    talentPortfolio: builder.query<HttpResponse<PortfolioStatsResponse>, AnalyticsDto>({
      query: () => ({
        url: `/analytics/talent/portfolio`,
        method: "GET",
      }),
    }),
    talentApplications: builder.query<HttpResponse<TalentApplicationStats>, unknown>({
      query: () => ({
        url: `/analytics/talent/applications`,
        method: "GET",
      }),
    }),
    talentViewerInsights: builder.query<HttpResponse<ViewerInsightsResponse>, AnalyticsDto>({
      query: () => ({
        url: `/analytics/talent/viewer-insights`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAdminApplicationsQuery,
  useAdminDashboardQuery,
  useAdminJobsQuery,
  useAdminOverviewQuery,
  useAdminRevenueQuery,
  useAdminUsersQuery,
  useRecruiterApplicationsQuery,
  useRecruiterDashboardQuery,
  useRecruiterJobsQuery,
  useTalentApplicationsQuery,
  useTalentDashboardQuery,
  useTalentPortfolioQuery,
  useTalentProfileViewsQuery,
  useTalentViewerInsightsQuery,
  useTrackEventMutation,
  useTrackJobViewMutation,
  useTrackPageViewMutation,
  useTrackPortfolioViewMutation,
  useTrackProfileViewMutation,
} = analytics;
