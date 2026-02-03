"use client";

import { motion } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";
import React from "react";
import {
  RiBriefcaseLine,
  RiAddLine,
  RiMapPinLine,
  RiTimeLine,
  RiUserLine,
  RiDeleteBin6Line,
  RiEyeLine,
} from "@remixicon/react";

import { useGetJobsByUserQuery, useCreateJobMutation, useDeleteJobMutation } from "@/api/job";
import { Pagination, ScrollArea } from "@/components/shared";
import { CreateJob } from "@/components/modules/job";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUserStore } from "@/store/user";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import type { CreateJobDto } from "@/types";
import { formatDate, fromSnakeCase } from "@/lib";

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

const PAGE_SIZE = 9;

const Page = () => {
  const [deleteJobId, setDeleteJobId] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const { user } = useUserStore();

  const [createJob, { isLoading: isCreating }] = useCreateJobMutation();
  const [deleteJob, { isLoading: isDeleting }] = useDeleteJobMutation();

  const { data, isLoading, refetch } = useGetJobsByUserQuery(
    { page, size: PAGE_SIZE },
    { refetchOnFocus: true, refetchOnMountOrArgChange: true },
  );

  const jobs = React.useMemo(() => data?.data.data || [], [data]);
  const total = data?.data.total_items || 0;

  const handleCreateJob = async (payload: CreateJobDto) => {
    try {
      await createJob(payload).unwrap();
      toast.success("Job created successfully");
      setOpen(false);
      refetch();
    } catch {
      toast.error("Failed to create job");
    }
  };

  const handleDeleteJob = async () => {
    if (!deleteJobId) return;
    try {
      await deleteJob(deleteJobId).unwrap();
      toast.success("Job deleted successfully");
      setDeleteJobId(null);
      refetch();
    } catch {
      toast.error("Failed to delete job");
    }
  };

  const handleOpenDialog = (open: boolean) => {
    if (!user?.company) {
      toast.error("Please create a company profile first");
      return;
    }
    if (!isLoading) {
      setOpen(open);
    }
  };

  return (
    <ScrollArea>
      <motion.div className="w-full space-y-6 pb-10" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold text-white">My Job Postings</h1>
            <p className="text-gray-400">Manage your job listings and view applications</p>
          </div>
          <CreateJob
            isLoading={isCreating}
            onCreateJob={handleCreateJob}
            onOpenChange={handleOpenDialog}
            open={open}
            refetch={refetch}
          />
        </motion.div>
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="h-48 animate-pulse bg-white/5" />
            ))}
          </div>
        ) : jobs.length > 0 ? (
          <>
            <motion.div
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {jobs.map((job) => (
                <motion.div
                  key={job.id}
                  variants={itemVariants}
                  className="group border border-white/10 bg-white/5 p-5 transition-all hover:border-white/20 hover:bg-white/10"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <h3 className="line-clamp-1 font-semibold text-white">{job.title}</h3>
                    <Badge className="shrink-0">{fromSnakeCase(job.employment_type)}</Badge>
                  </div>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <RiMapPinLine className="size-4 shrink-0" />
                      <span className="line-clamp-1">{job.is_remote ? "Remote" : job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RiUserLine className="size-4 shrink-0" />
                      <span>{job.applications?.length || 0} applications</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RiTimeLine className="size-4 shrink-0" />
                      <span>Posted {formatDate(job.posted_date)}</span>
                    </div>
                  </div>
                  {job.salary && (
                    <div className="mt-3 border-t border-white/10 pt-3">
                      <p className="text-primary-400 text-sm font-medium">
                        {job.salary.currency} {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}
                      </p>
                    </div>
                  )}
                  <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-4">
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <Link href={`/vacancies/${job.id}`}>
                        <RiEyeLine className="mr-1 size-3" />
                        View
                      </Link>
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => setDeleteJobId(job.id)}>
                      <RiDeleteBin6Line className="size-3" />
                    </Button>
                  </div>
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
            <h3 className="mt-4 text-lg font-semibold text-white">No job postings yet</h3>
            <p className="mt-2 text-gray-400">Create your first job posting to start receiving applications</p>
            <Button className="mt-6" onClick={() => handleOpenDialog(true)}>
              <RiAddLine className="mr-2 size-4" />
              Post Your First Job
            </Button>
          </motion.div>
        )}
        <Dialog open={!!deleteJobId} onOpenChange={() => setDeleteJobId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Job Posting</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this job posting? This action cannot be undone and all applications will
                be lost.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button variant="destructive" onClick={handleDeleteJob} disabled={isDeleting}>
                {isDeleting ? "Deleting..." : "Delete Job"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </ScrollArea>
  );
};

export default Page;
