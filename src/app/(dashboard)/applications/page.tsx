"use client";

import {
  RiBriefcaseLine,
  RiCheckLine,
  RiCloseLine,
  RiTimeLine,
  RiMapPinLine,
  RiBuilding2Line,
  RiCalendarLine,
} from "@remixicon/react";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

import { useGetApplicationsForUserQuery } from "@/api/job";
import { Pagination, ScrollArea } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
} as const;

const PAGE_SIZE = 12;

type StatusFilter = "all" | "pending" | "accepted" | "rejected";

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
  const [statusFilter, setStatusFilter] = React.useState<StatusFilter>("all");
  const [page, setPage] = React.useState(1);

  const { data, isLoading } = useGetApplicationsForUserQuery(
    { page, size: PAGE_SIZE },
    { refetchOnFocus: true, refetchOnMountOrArgChange: true },
  );

  const applications = React.useMemo(() => data?.data.data || [], [data]);
  const total = data?.data.total_items || 0;

  const filteredApplications = React.useMemo(() => {
    if (statusFilter === "all") return applications;
    return applications.filter((a) => a.status.toLowerCase() === statusFilter);
  }, [applications, statusFilter]);

  const statusCounts = React.useMemo(() => {
    return {
      all: applications.length,
      pending: applications.filter((a) => a.status.toLowerCase() === "pending").length,
      accepted: applications.filter((a) => a.status.toLowerCase() === "accepted").length,
      rejected: applications.filter((a) => a.status.toLowerCase() === "rejected").length,
    };
  }, [applications]);

  return (
    <ScrollArea>
      <motion.div className="w-full space-y-6 pb-10" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants}>
          <h1 className="text-2xl font-bold text-white">My Applications</h1>
          <p className="text-gray-400">Track and manage your job applications</p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
          {(["all", "pending", "accepted", "rejected"] as const).map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(status)}
              className="capitalize"
            >
              {status} ({statusCounts[status]})
            </Button>
          ))}
        </motion.div>

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 animate-pulse bg-white/5" />
            ))}
          </div>
        ) : filteredApplications.length > 0 ? (
          <>
            <motion.div
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredApplications.map((application) => (
                <motion.div key={application.id} variants={itemVariants}>
                  <Link
                    href={`/applications/${application.id}`}
                    className="group block border border-white/10 bg-white/5 p-5 transition-all hover:border-white/20 hover:bg-white/10"
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <h3 className="group-hover:text-primary-400 line-clamp-1 font-semibold text-white transition-colors">
                        {application.job.title}
                      </h3>
                      {getStatusBadge(application.status)}
                    </div>

                    <div className="space-y-2 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <RiBuilding2Line className="size-4 shrink-0" />
                        <span className="line-clamp-1">{application.job.company.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <RiMapPinLine className="size-4 shrink-0" />
                        <span className="line-clamp-1">
                          {application.job.is_remote ? "Remote" : application.job.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <RiCalendarLine className="size-4 shrink-0" />
                        <span>Applied {new Date(application.submission_date).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {application.job.salary && (
                      <div className="mt-3 border-t border-white/10 pt-3">
                        <p className="text-primary-400 text-sm font-medium">
                          {application.job.salary.currency} {application.job.salary.min.toLocaleString()} -{" "}
                          {application.job.salary.max.toLocaleString()}
                        </p>
                      </div>
                    )}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {total > PAGE_SIZE && (
              <motion.div variants={itemVariants}>
                <Pagination current={page} limit={PAGE_SIZE} total={total} onPageChange={setPage} className="mt-6" />
              </motion.div>
            )}
          </>
        ) : (
          <motion.div variants={itemVariants} className="py-16 text-center">
            <RiBriefcaseLine className="mx-auto size-16 text-gray-600" />
            <h3 className="mt-4 text-lg font-semibold text-white">No applications found</h3>
            <p className="mt-2 text-gray-400">
              {statusFilter === "all" ? "You haven't applied to any jobs yet" : `No ${statusFilter} applications`}
            </p>
            {statusFilter === "all" && (
              <Button asChild className="mt-6">
                <Link href="/talent-pool">Browse Jobs</Link>
              </Button>
            )}
          </motion.div>
        )}
      </motion.div>
    </ScrollArea>
  );
};

export default Page;
