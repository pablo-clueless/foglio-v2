"use client";

import {
  RiBriefcaseLine,
  RiCheckLine,
  RiCloseLine,
  RiFileTextLine,
  RiTimeLine,
  RiArrowRightLine,
} from "@remixicon/react";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

import { useGetApplicationsForUserQuery } from "@/api/job";
import { Avatar, ScrollArea } from "@/components/shared";
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

const Page = () => {
  const { user } = useUserStore();
  const { data, isLoading } = useGetApplicationsForUserQuery(
    { page: 1, size: 100 },
    { refetchOnFocus: true, refetchOnMountOrArgChange: true },
  );

  const applications = data?.data.data || [];
  const stats = React.useMemo(() => {
    const pending = applications.filter((a) => a.status.toLowerCase() === "pending").length;
    const accepted = applications.filter((a) => a.status.toLowerCase() === "accepted").length;
    const rejected = applications.filter((a) => a.status.toLowerCase() === "rejected").length;
    return { total: applications.length, pending, accepted, rejected };
  }, [applications]);

  const recentApplications = applications.slice(0, 5);

  if (!user) {
    return <div className="grid h-full w-full place-items-center" />;
  }

  return (
    <ScrollArea>
      <motion.div className="w-full space-y-6 pb-10" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants} className="rounded-lg border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Avatar
                alt={getInitials(user.name)}
                className="bg-primary-400 size-16 text-xl font-bold text-black"
                src={user.image}
              />
              <div>
                <h1 className="text-2xl font-bold text-white">Welcome back, {user.name.split(" ")[0]}!</h1>
                <p className="text-gray-400">{user.headline || user.role || "Job Seeker"}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/resume">Edit Resume</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/jobs">Browse Jobs</Link>
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-blue-500/20">
                <RiBriefcaseLine className="size-5 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
                <p className="text-sm text-gray-400">Total Applications</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-yellow-500/20">
                <RiTimeLine className="size-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.pending}</p>
                <p className="text-sm text-gray-400">Pending</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-green-500/20">
                <RiCheckLine className="size-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.accepted}</p>
                <p className="text-sm text-gray-400">Accepted</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-red-500/20">
                <RiCloseLine className="size-5 text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.rejected}</p>
                <p className="text-sm text-gray-400">Rejected</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="rounded-lg border border-white/10 bg-white/5 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-white/5">
                <RiFileTextLine className="text-primary-100 size-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">Recent Applications</h3>
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
                <div key={i} className="h-16 animate-pulse rounded-lg bg-white/5" />
              ))}
            </div>
          ) : recentApplications.length > 0 ? (
            <div className="space-y-3">
              {recentApplications.map((application) => (
                <Link
                  key={application.id}
                  href={`/applications/${application.id}`}
                  className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 p-4 transition-colors hover:bg-white/10"
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
              <p className="mt-2 text-gray-400">No applications yet</p>
              <Button asChild className="mt-4" size="sm">
                <Link href="/talent-pool">Start Applying</Link>
              </Button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </ScrollArea>
  );
};

export default Page;
