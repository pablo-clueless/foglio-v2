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
