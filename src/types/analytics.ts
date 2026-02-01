import type { NumberModule } from "@faker-js/faker";

export interface AnalyticsDto {
  start_date: string;
  end_date: string;
}

export interface AnalyticsDtoWithGroup extends AnalyticsDto {
  group_by: "day" | "week" | "month";
}

export interface TrackPageViewDto {
  path: string;
  session_id: string;
  referrer: string;
  duration: number;
}

export interface TrackJobViewDto {
  job_id: string;
  session_id: string;
  referrer: string;
}

export interface TrackProfileViewDto {
  profile_user_id: string;
  session_id: string;
  referrer: string;
}

export interface TrackPortfolioViewDto {
  portfolio_id: string;
  session_id: string;
  referrer: string;
  duration: number;
}

export interface TrackEventDto {
  event_type: string;
  entity_id: string;
  entity_type: string;
  session_id: string;
  properties: Record<string, string>;
}

// Response DTOs
export interface AdminDashboardAnalytics {
  overview: PlatformOverview;
  user_stats: UserStatsResponse;
  job_stats: JobStatsResponse;
  application_stats: ApplicationStatsResponse;
  revenue_stats: RevenueStatsResponse;
  trend_data: TrendDataPoint[];
  top_performers: TopPerformersResponse;
}

export interface PlatformOverview {
  total_users: number;
  total_recruiters: number;
  total_talents: number;
  total_jobs: number;
  total_applications: number;
  total_page_views: number;
  unique_visitors: number;
  active_subscriptions: number;
  growth_rate: number;
}

export interface UserStatsResponse {
  new_users_today: number;
  new_users_this_week: number;
  new_users_this_month: number;
  users_by_provider: ProviderCount[];
  users_by_location: LocationCount[];
  verification_rate: number;
}

export interface JobStatsResponse {
  total_active_jobs: number;
  new_jobs_today: number;
  new_jobs_this_week: number;
  new_jobs_this_month: number;
  jobs_by_type: EmploymentTypeCount[];
  jobs_by_location: LocationCount[];
  average_applications_per_job: number;
  most_viewed_jobs: JobViewCount[];
}

export interface ApplicationStatsResponse {
  total_applications: number;
  applications_today: number;
  applications_this_week: number;
  applications_this_month: number;
  applications_by_status: StatusCount[];
  average_response_time_hours: number;
  acceptance_rate: number;
  hire_rate: number;
}

export interface RevenueStatsResponse {
  total_revenue: number;
  revenue_this_month: number;
  revenue_last_month: number;
  monthly_growth: number;
  subscriptions_by_tier: TierCount[];
  average_revenue_per_user: number;
}

export interface TopPerformersResponse {
  top_recruiters: RecruiterPerformance[];
  top_jobs: JobPerformance[];
  top_talents: TalentPerformance[];
}

export interface RecruiterAnalytics {
  overview: RecruiterOverview;
  job_performance: JobPerformanceDetail[];
  application_stats: RecruiterApplicationStats;
  trend_data: TrendDataPoint[];
  top_applicants: ApplicantInfo[];
}

export interface RecruiterOverview {
  total_jobs: NumberModule;
  active_jobs: NumberModule;
  total_applications: NumberModule;
  pending_applications: NumberModule;
  total_job_views: NumberModule;
  total_hires: NumberModule;
  response_rate: number;
  average_time_to_hire_days: number;
}

export interface JobPerformanceDetail {
  job_id: string;
  title: string;
  views: number;
  applications: number;
  conversion_rate: number;
  status: string;
  posted_date: string;
}

export interface RecruiterApplicationStats {
  total_received: number;
  pending: number;
  reviewed: number;
  accepted: number;
  rejected: number;
  hired: number;
  by_status: StatusCount[];
}

export interface ApplicantInfo {
  user_id: string;
  name: string;
  email: string;
  applied_date: string;
  job_title: string;
  status: string;
}

// Talent Analytics
export interface TalentAnalytics {
  overview: TalentOverview;
  profile_views: ProfileViewsStats;
  portfolio_stats: PortfolioStatsResponse;
  application_stats: TalentApplicationStats;
  trend_data: TrendDataPoint[];
  viewer_insights: ViewerInsightsResponse;
}

export interface TalentOverview {
  total_profile_views: number;
  total_portfolio_views: number;
  total_applications: number;
  pending_applications: number;
  accepted_applications: number;
  recruiter_views: number;
  profile_completeness: number;
}

export interface ProfileViewsStats {
  total_views: number;
  views_today: number;
  views_this_week: number;
  views_this_month: number;
  unique_viewers: number;
  recruiter_viewers: number;
  views_by_country: LocationCount[];
  views_by_device: DeviceCount[];
}

export interface PortfolioStatsResponse {
  total_views: number;
  unique_visitors: number;
  average_duration_seconds: number;
  bounce_rate: number;
  top_referrers: ReferrerCount[];
  views_by_page: PageViewCount[];
}

export interface TalentApplicationStats {
  total_sent: number;
  pending: number;
  reviewed: number;
  accepted: number;
  rejected: number;
  hired: number;
  response_rate: number;
  by_status: StatusCount[];
}

export interface ViewerInsightsResponse {
  recruiter_views: number;
  talent_views: number;
  anonymous_views: number;
  top_viewer_companies: CompanyViewCount[];
}

// Common types
export interface TrendDataPoint {
  date: string;
  value: number;
  label: string;
}

export interface ProviderCount {
  provider: string;
  count: number;
}

export interface LocationCount {
  location: string;
  count: number;
}

export interface EmploymentTypeCount {
  type: string;
  count: number;
}

export interface StatusCount {
  status: string;
  count: number;
}

export interface TierCount {
  tier: string;
  count: number;
}

export interface JobViewCount {
  job_id: string;
  title: string;
  views: number;
}

export interface DeviceCount {
  device: string;
  count: number;
}

export interface ReferrerCount {
  referrer: string;
  count: number;
}

export interface PageViewCount {
  path: string;
  views: number;
}

export interface CompanyViewCount {
  company: string;
  views: number;
}

export interface RecruiterPerformance {
  user_id: string;
  name: string;
  total_jobs: number;
  total_hires: number;
  response_rate: number;
}

export interface JobPerformance {
  job_id: string;
  title: string;
  company: string;
  views: number;
  applications: number;
}

export interface TalentPerformance {
  user_id: string;
  name: string;
  profile_views: number;
  applications: number;
}
