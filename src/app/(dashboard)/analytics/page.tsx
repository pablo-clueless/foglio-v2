"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";
import {
  RiBriefcaseLine,
  RiFileTextLine,
  RiUserLine,
  RiEyeLine,
  RiCheckLine,
  RiBarChartLine,
  RiArrowUpLine,
  RiArrowDownLine,
  RiArrowRightLine,
  RiLineChartLine,
  RiPieChartLine,
  RiTeamLine,
  RiUserSearchLine,
} from "@remixicon/react";

import { useRecruiterDashboardQuery, useTalentDashboardQuery } from "@/api/analytics";
import { ScrollArea } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/user";
import type { AnalyticsDtoWithGroup, TrendDataPoint, StatusCount } from "@/types";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
} as const;

// Get date range for last 30 days
const getDateRange = (): AnalyticsDtoWithGroup => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);
  return {
    start_date: format(startDate, "yyyy-MM-dd"),
    end_date: format(endDate, "yyyy-MM-dd"),
    group_by: "day",
  };
};

// Stat Card Component
interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: number | string;
  trend?: { value: number; isPositive: boolean };
  iconColor: "blue" | "green" | "yellow" | "red" | "purple";
}

const StatCard = ({ icon: Icon, label, value, trend, iconColor }: StatCardProps) => {
  const colorMap = {
    blue: "bg-blue-500/20 text-blue-400",
    green: "bg-green-500/20 text-green-400",
    yellow: "bg-yellow-500/20 text-yellow-400",
    red: "bg-red-500/20 text-red-400",
    purple: "bg-purple-500/20 text-purple-400",
  };

  return (
    <div className="border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-3">
        <div className={`flex size-10 items-center justify-center ${colorMap[iconColor]}`}>
          <Icon className="size-5" />
        </div>
        <div className="flex-1">
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-sm text-gray-400">{label}</p>
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm ${trend.isPositive ? "text-green-400" : "text-red-400"}`}>
            {trend.isPositive ? <RiArrowUpLine className="size-4" /> : <RiArrowDownLine className="size-4" />}
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Status Distribution Bar
interface StatusDistributionProps {
  data: StatusCount[];
  total: number;
}

const StatusDistribution = ({ data, total }: StatusDistributionProps) => {
  if (total === 0) return null;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-500";
      case "reviewed":
        return "bg-blue-500";
      case "accepted":
      case "hired":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex h-4 overflow-hidden rounded">
        {data.map((item, index) => (
          <div
            key={index}
            className={`${getStatusColor(item.status)} transition-all`}
            style={{ width: `${(item.count / total) * 100}%` }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={`size-3 rounded ${getStatusColor(item.status)}`} />
            <span className="text-sm text-gray-400 capitalize">
              {item.status}: {item.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Trend Bars Component
interface TrendBarsProps {
  data: TrendDataPoint[];
}

const TrendBars = ({ data }: TrendBarsProps) => {
  if (!data || data.length === 0) {
    return <div className="flex h-32 items-center justify-center text-gray-500">No trend data available</div>;
  }

  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="flex items-end gap-1" style={{ height: "128px" }}>
      {data.slice(-14).map((point, i) => (
        <div key={i} className="flex flex-1 flex-col items-center">
          <div
            className="bg-primary-400 hover:bg-primary-300 w-full rounded-t transition-all"
            style={{ height: `${(point.value / maxValue) * 100}%`, minHeight: point.value > 0 ? "4px" : "0" }}
          />
          <span className="mt-1 w-full truncate text-center text-[10px] text-gray-500">{point.label.slice(0, 3)}</span>
        </div>
      ))}
    </div>
  );
};

// Recruiter Analytics View
const RecruiterAnalytics = () => {
  const params = React.useMemo(() => getDateRange(), []);
  const { data, isLoading } = useRecruiterDashboardQuery(params, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const analytics = data?.data;

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 animate-pulse bg-white/5" />
        ))}
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="py-12 text-center">
        <RiBarChartLine className="mx-auto size-12 text-gray-600" />
        <p className="mt-2 text-gray-400">No analytics data available</p>
      </div>
    );
  }

  const { overview, application_stats, trend_data, job_performance, top_applicants } = analytics;

  return (
    <>
      {/* Overview Stats */}
      <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={RiBriefcaseLine} label="Total Jobs" value={Number(overview.total_jobs) || 0} iconColor="blue" />
        <StatCard
          icon={RiBriefcaseLine}
          label="Active Jobs"
          value={Number(overview.active_jobs) || 0}
          iconColor="green"
        />
        <StatCard
          icon={RiFileTextLine}
          label="Applications"
          value={Number(overview.total_applications) || 0}
          iconColor="yellow"
        />
        <StatCard icon={RiUserLine} label="Total Hires" value={Number(overview.total_hires) || 0} iconColor="purple" />
      </motion.div>

      {/* Application Status Distribution */}
      <motion.div variants={itemVariants} className="border border-white/10 bg-white/5 p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center bg-white/5">
            <RiPieChartLine className="text-primary-100 size-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Application Status</h3>
            <p className="text-sm text-gray-400">Distribution of application statuses</p>
          </div>
        </div>
        <StatusDistribution data={application_stats.by_status || []} total={application_stats.total_received || 0} />
      </motion.div>

      {/* Trend Chart */}
      <motion.div variants={itemVariants} className="border border-white/10 bg-white/5 p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center bg-white/5">
            <RiLineChartLine className="text-primary-100 size-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Application Trends</h3>
            <p className="text-sm text-gray-400">Applications received over time</p>
          </div>
        </div>
        <TrendBars data={trend_data || []} />
      </motion.div>

      {/* Job Performance */}
      {job_performance && job_performance.length > 0 && (
        <motion.div variants={itemVariants} className="border border-white/10 bg-white/5 p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center bg-white/5">
              <RiBriefcaseLine className="text-primary-100 size-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Job Performance</h3>
              <p className="text-sm text-gray-400">Performance metrics for your job postings</p>
            </div>
          </div>
          <div className="space-y-3">
            {job_performance.slice(0, 5).map((job) => (
              <div key={job.job_id} className="border border-white/5 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white">{job.title}</span>
                  <Badge
                    className={
                      job.status === "active"
                        ? "border-green-500/30 bg-green-500/20 text-green-400"
                        : "border-gray-500/30 bg-gray-500/20 text-gray-400"
                    }
                  >
                    {job.status}
                  </Badge>
                </div>
                <div className="mt-2 flex gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <RiEyeLine className="size-4" />
                    {job.views} views
                  </span>
                  <span className="flex items-center gap-1">
                    <RiFileTextLine className="size-4" />
                    {job.applications} applications
                  </span>
                  <span>{(job.conversion_rate * 100).toFixed(1)}% conversion</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded bg-white/10">
                  <div
                    className="bg-primary-400 h-full rounded"
                    style={{ width: `${Math.min(job.conversion_rate * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Top Applicants */}
      {top_applicants && top_applicants.length > 0 && (
        <motion.div variants={itemVariants} className="border border-white/10 bg-white/5 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center bg-white/5">
                <RiTeamLine className="text-primary-100 size-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Recent Applicants</h3>
                <p className="text-sm text-gray-400">Latest applications received</p>
              </div>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href="/applications" className="flex items-center gap-1">
                View All
                <RiArrowRightLine className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="space-y-3">
            {top_applicants.slice(0, 5).map((applicant) => (
              <div
                key={applicant.user_id}
                className="flex items-center justify-between border border-white/5 bg-white/5 p-3"
              >
                <div>
                  <p className="font-medium text-white">{applicant.name}</p>
                  <p className="text-sm text-gray-400">{applicant.job_title}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">{new Date(applicant.applied_date).toLocaleDateString()}</span>
                  <Badge
                    className={
                      applicant.status === "accepted"
                        ? "border-green-500/30 bg-green-500/20 text-green-400"
                        : applicant.status === "rejected"
                          ? "border-red-500/30 bg-red-500/20 text-red-400"
                          : "border-yellow-500/30 bg-yellow-500/20 text-yellow-400"
                    }
                  >
                    {applicant.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
};

// Talent Analytics View
const TalentAnalytics = () => {
  const params = React.useMemo(() => getDateRange(), []);
  const { data, isLoading } = useTalentDashboardQuery(params, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const analytics = data?.data;

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 animate-pulse bg-white/5" />
        ))}
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="py-12 text-center">
        <RiBarChartLine className="mx-auto size-12 text-gray-600" />
        <p className="mt-2 text-gray-400">No analytics data available</p>
      </div>
    );
  }

  const { overview, application_stats, trend_data, profile_views, viewer_insights } = analytics;

  return (
    <>
      {/* Overview Stats */}
      <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={RiEyeLine} label="Profile Views" value={overview.total_profile_views || 0} iconColor="blue" />
        <StatCard
          icon={RiFileTextLine}
          label="Applications"
          value={overview.total_applications || 0}
          iconColor="yellow"
        />
        <StatCard icon={RiCheckLine} label="Accepted" value={overview.accepted_applications || 0} iconColor="green" />
        <StatCard
          icon={RiUserSearchLine}
          label="Recruiter Views"
          value={overview.recruiter_views || 0}
          iconColor="purple"
        />
      </motion.div>

      {/* Profile Completeness */}
      <motion.div variants={itemVariants} className="border border-white/10 bg-white/5 p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center bg-white/5">
              <RiUserLine className="text-primary-100 size-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Profile Completeness</h3>
              <p className="text-sm text-gray-400">Complete your profile to attract more recruiters</p>
            </div>
          </div>
          <span className="text-2xl font-bold text-white">{overview.profile_completeness || 0}%</span>
        </div>
        <div className="h-3 overflow-hidden rounded bg-white/10">
          <div
            className="bg-primary-400 h-full rounded transition-all"
            style={{ width: `${overview.profile_completeness || 0}%` }}
          />
        </div>
      </motion.div>

      {/* Application Status Distribution */}
      <motion.div variants={itemVariants} className="border border-white/10 bg-white/5 p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center bg-white/5">
            <RiPieChartLine className="text-primary-100 size-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Application Status</h3>
            <p className="text-sm text-gray-400">Status of your job applications</p>
          </div>
        </div>
        <StatusDistribution data={application_stats.by_status || []} total={application_stats.total_sent || 0} />
      </motion.div>

      {/* Trend Chart */}
      <motion.div variants={itemVariants} className="border border-white/10 bg-white/5 p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center bg-white/5">
            <RiLineChartLine className="text-primary-100 size-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Profile View Trends</h3>
            <p className="text-sm text-gray-400">How your profile is being viewed over time</p>
          </div>
        </div>
        <TrendBars data={trend_data || []} />
      </motion.div>

      {/* Profile Views Stats */}
      {profile_views && (
        <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border border-white/10 bg-white/5 p-4 text-center">
            <p className="text-3xl font-bold text-white">{profile_views.views_today || 0}</p>
            <p className="text-sm text-gray-400">Views Today</p>
          </div>
          <div className="border border-white/10 bg-white/5 p-4 text-center">
            <p className="text-3xl font-bold text-white">{profile_views.views_this_week || 0}</p>
            <p className="text-sm text-gray-400">This Week</p>
          </div>
          <div className="border border-white/10 bg-white/5 p-4 text-center">
            <p className="text-3xl font-bold text-white">{profile_views.views_this_month || 0}</p>
            <p className="text-sm text-gray-400">This Month</p>
          </div>
          <div className="border border-white/10 bg-white/5 p-4 text-center">
            <p className="text-3xl font-bold text-white">{profile_views.unique_viewers || 0}</p>
            <p className="text-sm text-gray-400">Unique Viewers</p>
          </div>
        </motion.div>
      )}

      {/* Viewer Insights */}
      {viewer_insights && (
        <motion.div variants={itemVariants} className="border border-white/10 bg-white/5 p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center bg-white/5">
              <RiTeamLine className="text-primary-100 size-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Who's Viewing You</h3>
              <p className="text-sm text-gray-400">Breakdown of your profile viewers</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="border border-white/5 bg-white/5 p-4 text-center">
              <p className="text-2xl font-bold text-purple-400">{viewer_insights.recruiter_views || 0}</p>
              <p className="text-sm text-gray-400">Recruiters</p>
            </div>
            <div className="border border-white/5 bg-white/5 p-4 text-center">
              <p className="text-2xl font-bold text-blue-400">{viewer_insights.talent_views || 0}</p>
              <p className="text-sm text-gray-400">Other Talent</p>
            </div>
            <div className="border border-white/5 bg-white/5 p-4 text-center">
              <p className="text-2xl font-bold text-gray-400">{viewer_insights.anonymous_views || 0}</p>
              <p className="text-sm text-gray-400">Anonymous</p>
            </div>
          </div>
          {viewer_insights.top_viewer_companies && viewer_insights.top_viewer_companies.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 text-sm font-medium text-gray-400">Top Viewing Companies</p>
              <div className="flex flex-wrap gap-2">
                {viewer_insights.top_viewer_companies.slice(0, 5).map((company, index) => (
                  <Badge key={index} className="border-white/10 bg-white/5">
                    {company.company} ({company.views})
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </>
  );
};

const Page = () => {
  const { user } = useUserStore();
  const isRecruiter = user?.is_recruiter || false;

  if (!user) {
    return <div className="grid h-full w-full place-items-center" />;
  }

  return (
    <ScrollArea>
      <motion.div className="w-full space-y-6 pb-10" variants={containerVariants} initial="hidden" animate="visible">
        {/* Header */}
        <motion.div variants={itemVariants}>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-gray-400">
            {isRecruiter
              ? "Track your job postings and applicant insights"
              : "Monitor your profile performance and application status"}
          </p>
        </motion.div>

        {/* Conditional Content */}
        {isRecruiter ? <RecruiterAnalytics /> : <TalentAnalytics />}
      </motion.div>
    </ScrollArea>
  );
};

export default Page;
