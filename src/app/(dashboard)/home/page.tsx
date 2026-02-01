"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import {
  RiBriefcaseLine,
  RiCheckLine,
  RiCloseLine,
  RiFileTextLine,
  RiTimeLine,
  RiArrowRightLine,
  RiSearchLine,
  RiBarChartLine,
  RiAddLine,
  RiEyeLine,
  RiUserLine,
  RiTeamLine,
} from "@remixicon/react";

import { useRecruiterDashboardQuery, useTalentDashboardQuery } from "@/api/analytics";
import { useGetApplicationsForRecruiterQuery } from "@/api/job";
import { Avatar, ScrollArea } from "@/components/shared";
import type { AnalyticsDtoWithGroup } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUserStore } from "@/store/user";
import { getInitials } from "@/lib";

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

const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case "accepted":
      return (
        <Badge className="border-green-500/30 bg-green-500/20 text-green-400">
          <RiCheckLine className="size-3" />
          Accepted
        </Badge>
      );
    case "rejected":
      return (
        <Badge variant="destructive" className="border-red-500/30 bg-red-500/20 text-red-400">
          <RiCloseLine className="size-3" />
          Rejected
        </Badge>
      );
    default:
      return (
        <Badge className="border-yellow-500/30 bg-yellow-500/20 text-yellow-400">
          <RiTimeLine className="size-3" />
          Pending
        </Badge>
      );
  }
};

const initialParams: AnalyticsDtoWithGroup = {
  start_date: new Date().toDateString(),
  end_date: new Date().toDateString(),
  group_by: "day",
};

// Quick Action Card Component
interface QuickActionCardProps {
  icon: React.ElementType;
  label: string;
  href: string;
  color: "blue" | "green" | "purple" | "yellow";
}

const QuickActionCard = ({ icon: Icon, label, href, color }: QuickActionCardProps) => {
  const colorMap = {
    blue: "bg-blue-500/20 text-blue-400 group-hover:bg-blue-500/30",
    green: "bg-green-500/20 text-green-400 group-hover:bg-green-500/30",
    purple: "bg-purple-500/20 text-purple-400 group-hover:bg-purple-500/30",
    yellow: "bg-yellow-500/20 text-yellow-400 group-hover:bg-yellow-500/30",
  };

  return (
    <Link
      href={href}
      className="group flex items-center gap-3 border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10"
    >
      <div className={`flex size-10 items-center justify-center transition-colors ${colorMap[color]}`}>
        <Icon className="size-5" />
      </div>
      <span className="font-medium text-white">{label}</span>
      <RiArrowRightLine className="ml-auto size-4 text-gray-500 transition-transform group-hover:translate-x-1" />
    </Link>
  );
};

const Page = () => {
  const [params] = React.useState(initialParams);
  const { user } = useUserStore();

  const isRecruiter = user?.is_recruiter || false;

  const { data: recruiterData } = useRecruiterDashboardQuery(params, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    skip: !isRecruiter,
  });

  const { data: talentData } = useTalentDashboardQuery(params, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    skip: !!isRecruiter,
  });

  const { data, isLoading } = useGetApplicationsForRecruiterQuery(
    { page: 1, size: 100 },
    { refetchOnFocus: true, refetchOnMountOrArgChange: true, skip: true },
  );

  const applications = React.useMemo(() => data?.data.data || [], [data?.data]);

  const stats = React.useMemo(() => {
    if (isRecruiter && recruiterData?.data) {
      const overview = recruiterData.data.overview;
      return {
        total: Number(overview.total_jobs) || 0,
        active: Number(overview.active_jobs) || 0,
        applications: Number(overview.total_applications) || 0,
        hires: Number(overview.total_hires) || 0,
      };
    }

    if (!isRecruiter && talentData?.data) {
      const overview = talentData.data.overview;
      return {
        total: overview.total_applications || 0,
        pending: overview.pending_applications || 0,
        accepted: overview.accepted_applications || 0,
        views: overview.total_profile_views || 0,
      };
    }

    const pending = applications.filter((a) => a.status.toLowerCase() === "pending").length;
    const accepted = applications.filter((a) => a.status.toLowerCase() === "accepted").length;
    const rejected = applications.filter((a) => a.status.toLowerCase() === "rejected").length;
    return { total: applications.length, pending, accepted, rejected };
  }, [applications, isRecruiter, recruiterData, talentData]);

  const recentApplications = applications.slice(0, 5);

  if (!user) {
    return <div className="grid h-full w-full place-items-center" />;
  }

  return (
    <ScrollArea>
      <motion.div className="w-full space-y-6 pb-10" variants={containerVariants} initial="hidden" animate="visible">
        {/* Welcome Section */}
        <motion.div variants={itemVariants} className="border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Avatar
                alt={getInitials(user.name)}
                className="bg-primary-400 size-16 text-xl font-bold text-black"
                src={user.image}
              />
              <div>
                <h1 className="text-xl font-medium text-white sm:text-2xl">Welcome back, {user.name.split(" ")[0]}!</h1>
                <p className="text-gray-400">
                  {user.headline || user.role || (isRecruiter ? "Recruiter" : "Job Seeker")}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {isRecruiter ? (
                <>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/vacancies">Manage Jobs</Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href="/vacancies/create">
                      <RiAddLine className="mr-1 size-4" />
                      Post Job
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/resume">Edit Resume</Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href="/jobs">Browse Jobs</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Stats Grid - Different for Recruiter vs Talent */}
        <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {isRecruiter ? (
            <>
              <div className="border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center bg-blue-500/20">
                    <RiBriefcaseLine className="size-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.total}</p>
                    <p className="text-sm text-gray-400">Total Jobs</p>
                  </div>
                </div>
              </div>
              <div className="border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center bg-green-500/20">
                    <RiCheckLine className="size-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.active}</p>
                    <p className="text-sm text-gray-400">Active Jobs</p>
                  </div>
                </div>
              </div>
              <div className="border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center bg-yellow-500/20">
                    <RiFileTextLine className="size-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.applications}</p>
                    <p className="text-sm text-gray-400">Applications</p>
                  </div>
                </div>
              </div>
              <div className="border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center bg-purple-500/20">
                    <RiUserLine className="size-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.hires}</p>
                    <p className="text-sm text-gray-400">Total Hires</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center bg-blue-500/20">
                    <RiBriefcaseLine className="size-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.total}</p>
                    <p className="text-sm text-gray-400">Total Applications</p>
                  </div>
                </div>
              </div>
              <div className="border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center bg-yellow-500/20">
                    <RiTimeLine className="size-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.pending}</p>
                    <p className="text-sm text-gray-400">Pending</p>
                  </div>
                </div>
              </div>
              <div className="border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center bg-green-500/20">
                    <RiCheckLine className="size-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.accepted}</p>
                    <p className="text-sm text-gray-400">Accepted</p>
                  </div>
                </div>
              </div>
              <div className="border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center bg-purple-500/20">
                    <RiEyeLine className="size-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.views || 0}</p>
                    <p className="text-sm text-gray-400">Profile Views</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center bg-white/5">
              <RiArrowRightLine className="text-primary-100 size-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {isRecruiter ? (
              <>
                <QuickActionCard icon={RiAddLine} label="Post New Job" href="/vacancies/create" color="blue" />
                <QuickActionCard icon={RiTeamLine} label="View Candidates" href="/applications" color="green" />
                <QuickActionCard icon={RiBarChartLine} label="View Analytics" href="/analytics" color="purple" />
              </>
            ) : (
              <>
                <QuickActionCard icon={RiSearchLine} label="Browse Jobs" href="/jobs" color="blue" />
                <QuickActionCard icon={RiFileTextLine} label="My Applications" href="/applications" color="green" />
                <QuickActionCard icon={RiBarChartLine} label="View Analytics" href="/analytics" color="purple" />
              </>
            )}
          </div>
        </motion.div>

        {/* Recent Applications */}
        <motion.div variants={itemVariants} className="border border-white/10 bg-white/5 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center bg-white/5">
                <RiFileTextLine className="text-primary-100 size-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                {isRecruiter ? "Recent Applicants" : "Recent Applications"}
              </h3>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href="/applications" className="flex items-center gap-1">
                View All
                <RiArrowRightLine className="size-4" />
              </Link>
            </Button>
          </div>
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 animate-pulse bg-white/5" />
              ))}
            </div>
          ) : recentApplications.length > 0 ? (
            <div className="space-y-3">
              {recentApplications.map((application) => (
                <Link
                  key={application.id}
                  href={`/applications/${application.id}`}
                  className="flex items-center justify-between border border-white/5 bg-white/5 p-4 transition-colors hover:bg-white/10"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-white">{application.job.title}</h4>
                    <p className="text-sm text-gray-400">
                      {application.job.company} • {application.job.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-500">
                      {new Date(application.submission_date).toLocaleDateString()}
                    </span>
                    {getStatusBadge(application.status)}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <RiBriefcaseLine className="mx-auto size-12 text-gray-600" />
              <p className="mt-2 text-gray-400">{isRecruiter ? "No applicants yet" : "No applications yet"}</p>
              <Button asChild className="mt-4" size="sm">
                <Link href={isRecruiter ? "/vacancies/create" : "/jobs"}>
                  {isRecruiter ? "Post a Job" : "Start Applying"}
                </Link>
              </Button>
            </div>
          )}
        </motion.div>

        {/* Insights Preview */}
        <motion.div variants={itemVariants} className="border border-white/10 bg-white/5 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center bg-purple-500/20">
                <RiBarChartLine className="size-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Analytics Overview</h3>
                <p className="text-sm text-gray-400">Quick insights into your performance</p>
              </div>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/analytics" className="flex items-center gap-1">
                Full Analytics
                <RiArrowRightLine className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {isRecruiter ? (
              <>
                <div className="border border-white/5 bg-white/5 p-4 text-center">
                  <p className="text-3xl font-bold text-white">
                    {recruiterData?.data?.overview?.response_rate
                      ? `${(recruiterData.data.overview.response_rate * 100).toFixed(0)}%`
                      : "0%"}
                  </p>
                  <p className="text-sm text-gray-400">Response Rate</p>
                </div>
                <div className="border border-white/5 bg-white/5 p-4 text-center">
                  <p className="text-3xl font-bold text-white">
                    {Number(recruiterData?.data?.overview?.total_job_views) || 0}
                  </p>
                  <p className="text-sm text-gray-400">Job Views</p>
                </div>
                <div className="border border-white/5 bg-white/5 p-4 text-center">
                  <p className="text-3xl font-bold text-white">
                    {recruiterData?.data?.application_stats?.pending || 0}
                  </p>
                  <p className="text-sm text-gray-400">Pending Review</p>
                </div>
              </>
            ) : (
              <>
                <div className="border border-white/5 bg-white/5 p-4 text-center">
                  <p className="text-3xl font-bold text-white">
                    {talentData?.data?.application_stats?.response_rate
                      ? `${(talentData.data.application_stats.response_rate * 100).toFixed(0)}%`
                      : "0%"}
                  </p>
                  <p className="text-sm text-gray-400">Response Rate</p>
                </div>
                <div className="border border-white/5 bg-white/5 p-4 text-center">
                  <p className="text-3xl font-bold text-white">
                    {talentData?.data?.overview?.profile_completeness || 0}%
                  </p>
                  <p className="text-sm text-gray-400">Profile Complete</p>
                </div>
                <div className="border border-white/5 bg-white/5 p-4 text-center">
                  <p className="text-3xl font-bold text-white">{talentData?.data?.overview?.recruiter_views || 0}</p>
                  <p className="text-sm text-gray-400">Recruiter Views</p>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </ScrollArea>
  );
};

export default Page;
