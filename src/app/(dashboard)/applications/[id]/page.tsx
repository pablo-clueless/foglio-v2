"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import {
  RiArrowLeftLine,
  RiBriefcaseLine,
  RiBuilding2Line,
  RiCalendarLine,
  RiCheckLine,
  RiCloseLine,
  RiFileTextLine,
  RiMapPinLine,
  RiMoneyDollarCircleLine,
  RiTimeLine,
  RiGlobalLine,
  RiExternalLinkLine,
} from "@remixicon/react";

import { useGetApplicationQuery } from "@/api/job";
import { ScrollArea } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
        <Badge className="border-green-500/30 bg-green-500/20 px-3 py-1 text-sm text-green-400">
          <RiCheckLine className="size-4" />
          Accepted
        </Badge>
      );
    case "rejected":
      return (
        <Badge variant="destructive" className="border-red-500/30 bg-red-500/20 px-3 py-1 text-sm text-red-400">
          <RiCloseLine className="size-4" />
          Rejected
        </Badge>
      );
    default:
      return (
        <Badge className="border-yellow-500/30 bg-yellow-500/20 px-3 py-1 text-sm text-yellow-400">
          <RiTimeLine className="size-4" />
          Pending
        </Badge>
      );
  }
};

const formatEmploymentType = (type: string) => {
  return type
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");
};

const Page = () => {
  const id = useParams().id as string;
  const router = useRouter();

  const { data, isLoading, isError } = useGetApplicationQuery(id, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const application = data?.data;

  if (isLoading) {
    return (
      <div className="space-y-6 pb-10">
        <div className="h-8 w-48 animate-pulse rounded bg-white/5" />
        <div className="h-64 animate-pulse rounded-lg bg-white/5" />
        <div className="h-96 animate-pulse rounded-lg bg-white/5" />
      </div>
    );
  }

  if (isError || !application) {
    return (
      <div className="flex h-full flex-col items-center justify-center py-16">
        <RiBriefcaseLine className="size-16 text-gray-600" />
        <h2 className="mt-4 text-xl font-semibold text-white">Application not found</h2>
        <p className="mt-2 text-gray-400">The application you're looking for doesn't exist or has been removed.</p>
        <Button asChild className="mt-6">
          <Link href="/applications">Back to Applications</Link>
        </Button>
      </div>
    );
  }

  const { job } = application;

  return (
    <ScrollArea>
      <motion.div className="w-full space-y-6 pb-10" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants}>
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-4">
            <RiArrowLeftLine className="mr-1 size-4" />
            Back
          </Button>
        </motion.div>
        <motion.div variants={itemVariants} className="rounded-lg border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white">{job.title}</h1>
                {getStatusBadge(application.status)}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-gray-400">
                <div className="flex items-center gap-1">
                  <RiBuilding2Line className="size-4" />
                  <span>{job.company}</span>
                </div>
                <div className="flex items-center gap-1">
                  <RiMapPinLine className="size-4" />
                  <span>{job.is_remote ? "Remote" : job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <RiBriefcaseLine className="size-4" />
                  <span>{formatEmploymentType(job.employment_type)}</span>
                </div>
              </div>
            </div>
            {job.salary && (
              <div className="bg-primary-400/10 flex items-center gap-2 rounded-lg px-4 py-2">
                <RiMoneyDollarCircleLine className="text-primary-400 size-5" />
                <span className="text-primary-400 font-semibold">
                  {job.salary.currency} {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}
                </span>
              </div>
            )}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-white/5 p-4">
              <div className="flex items-center gap-2 text-gray-400">
                <RiCalendarLine className="size-4" />
                <span className="text-sm">Applied On</span>
              </div>
              <p className="mt-1 font-medium text-white">
                {new Date(application.submission_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="rounded-lg bg-white/5 p-4">
              <div className="flex items-center gap-2 text-gray-400">
                <RiTimeLine className="size-4" />
                <span className="text-sm">Last Updated</span>
              </div>
              <p className="mt-1 font-medium text-white">
                {new Date(application.last_updated).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="rounded-lg bg-white/5 p-4">
              <div className="flex items-center gap-2 text-gray-400">
                <RiGlobalLine className="size-4" />
                <span className="text-sm">Job Deadline</span>
              </div>
              <p className="mt-1 font-medium text-white">
                {new Date(job.deadline).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </motion.div>
        {application.notes && (
          <motion.div variants={itemVariants} className="rounded-lg border border-white/10 bg-white/5 p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-white/5">
                <RiFileTextLine className="text-primary-100 size-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">Recruiter Notes</h3>
            </div>
            <p className="whitespace-pre-wrap text-gray-300">{application.notes}</p>
          </motion.div>
        )}
        <motion.div variants={itemVariants} className="rounded-lg border border-white/10 bg-white/5 p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-white/5">
              <RiBriefcaseLine className="text-primary-100 size-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">Job Description</h3>
          </div>
          <p className="whitespace-pre-wrap text-gray-300">{job.description}</p>
        </motion.div>
        {job.requirements && job.requirements.length > 0 && (
          <motion.div variants={itemVariants} className="rounded-lg border border-white/10 bg-white/5 p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-white/5">
                <RiCheckLine className="text-primary-100 size-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">Requirements</h3>
            </div>
            <ul className="space-y-2">
              {job.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-300">
                  <span className="bg-primary-400 mt-1.5 size-1.5 shrink-0 rounded-full" />
                  {req}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
        {application.cover_letter && (
          <motion.div variants={itemVariants} className="rounded-lg border border-white/10 bg-white/5 p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-white/5">
                <RiFileTextLine className="text-primary-100 size-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">Your Cover Letter</h3>
            </div>
            <p className="whitespace-pre-wrap text-gray-300">{application.cover_letter}</p>
          </motion.div>
        )}
        {application.resume && (
          <motion.div variants={itemVariants} className="rounded-lg border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-white/5">
                  <RiFileTextLine className="text-primary-100 size-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Submitted Resume</h3>
                  <p className="text-sm text-gray-400">The resume you submitted with this application</p>
                </div>
              </div>
              <Button asChild variant="outline" size="sm">
                <a href={application.resume} target="_blank" rel="noopener noreferrer">
                  <RiExternalLinkLine className="mr-1 size-4" />
                  View Resume
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </ScrollArea>
  );
};

export default Page;
