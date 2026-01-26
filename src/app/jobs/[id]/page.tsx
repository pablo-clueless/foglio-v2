"use client";

import {
  RiArrowLeftLine,
  RiBriefcase4Line,
  RiBuilding2Line,
  RiCalendarLine,
  RiHomeOfficeLine,
  RiLoaderLine,
  RiMapPinLine,
  RiMoneyDollarCircleLine,
  RiShareLine,
} from "@remixicon/react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";

import { Footer, Navbar } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGetJobQuery } from "@/api/job";

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

const Page = () => {
  const id = useParams().id as string;
  const router = useRouter();

  const { data: job, isFetching } = useGetJobQuery(id, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    skip: !id,
  });

  if (isFetching) {
    return (
      <>
        <Navbar />
        <div className="w-screen overflow-hidden">
          <motion.section
            className="container mx-auto grid h-[500px] max-w-6xl place-items-center py-10 sm:py-28"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center gap-y-4">
              <RiLoaderLine className="text-primary-400 size-10 animate-spin" />
              <p className="text-gray-400">Loading job details...</p>
            </div>
          </motion.section>
        </div>
        <Footer />
      </>
    );
  }

  if (!job) {
    return (
      <>
        <Navbar />
        <div className="w-screen overflow-hidden">
          <motion.section
            className="container mx-auto grid h-[500px] max-w-6xl place-items-center py-10 sm:py-28"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center gap-y-4 text-center">
              <RiBriefcase4Line className="size-16 text-gray-600" />
              <h2 className="text-2xl font-semibold">Job not found</h2>
              <p className="text-gray-400">This job posting may have been removed or is no longer available.</p>
              <Button asChild className="mt-4">
                <Link href="/jobs">Browse All Jobs</Link>
              </Button>
            </div>
          </motion.section>
        </div>
        <Footer />
      </>
    );
  }

  const jobData = job.data;

  return (
    <>
      <Navbar />
      <div className="w-screen overflow-hidden">
        <motion.section
          className="container mx-auto max-w-6xl px-4 py-10 sm:py-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Back Button */}
          <motion.div variants={itemVariants} className="mb-8">
            <button
              onClick={() => router.back()}
              className="group flex items-center gap-x-2 text-sm text-gray-400 transition-colors hover:text-white"
            >
              <RiArrowLeftLine className="size-4 transition-transform group-hover:-translate-x-1" />
              Back to Jobs
            </button>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="space-y-6 lg:col-span-2">
              {/* Header */}
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge>
                    {jobData.is_remote ? <RiHomeOfficeLine /> : <RiBuilding2Line />}
                    {jobData.is_remote ? "Remote" : "On-site"}
                  </Badge>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      jobData.is_remote ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {jobData.employment_type}
                  </span>
                </div>
                <h1 className="text-3xl font-semibold capitalize sm:text-5xl">{jobData.title}</h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <p className="text-primary-400 text-lg font-medium">{jobData.company}</p>
                  <span className="bg-primary-400 hidden size-1.5 rounded-full sm:block"></span>
                  <div className="flex items-center gap-x-1 text-gray-400">
                    <RiMapPinLine className="size-4" />
                    <span>{jobData.location}</span>
                  </div>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                variants={itemVariants}
                className="border-primary-100/15 space-y-4 rounded-lg border bg-black/20 p-6"
              >
                <h2 className="text-xl font-semibold">Job Description</h2>
                <div className="space-y-4 text-gray-300">
                  <p className="leading-relaxed">{jobData.description}</p>
                </div>
              </motion.div>

              {/* Requirements Section */}
              <motion.div
                variants={itemVariants}
                className="border-primary-100/15 space-y-4 rounded-lg border bg-black/20 p-6"
              >
                <h2 className="text-xl font-semibold">Requirements</h2>
                <ul className="list-inside list-disc space-y-2 text-gray-300">
                  <li>Relevant experience in the field</li>
                  <li>Strong communication skills</li>
                  <li>Ability to work independently and in a team</li>
                  <li>Problem-solving mindset</li>
                </ul>
              </motion.div>

              {/* Benefits Section */}
              <motion.div
                variants={itemVariants}
                className="border-primary-100/15 space-y-4 rounded-lg border bg-black/20 p-6"
              >
                <h2 className="text-xl font-semibold">Benefits</h2>
                <ul className="list-inside list-disc space-y-2 text-gray-300">
                  <li>Competitive salary and benefits</li>
                  <li>Flexible working hours</li>
                  <li>Professional development opportunities</li>
                  <li>Health insurance</li>
                </ul>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Apply Card */}
              <motion.div
                variants={itemVariants}
                className="border-primary-100/15 sticky top-24 space-y-6 rounded-lg border bg-black/30 p-6"
              >
                <div className="space-y-4">
                  <Button className="w-full" size="lg">
                    Apply Now
                  </Button>
                  <Button variant="default-outline" className="w-full" size="lg">
                    <RiShareLine className="mr-2 size-4" />
                    Share Job
                  </Button>
                </div>

                <div className="border-primary-100/15 border-t pt-6">
                  <h3 className="mb-4 font-semibold">Job Overview</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-x-3">
                      <RiBriefcase4Line className="text-primary-400 mt-0.5 size-5" />
                      <div>
                        <p className="text-sm text-gray-400">Job Type</p>
                        <p className="capitalize">{jobData.employment_type.toLowerCase()}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-x-3">
                      <RiMapPinLine className="text-primary-400 mt-0.5 size-5" />
                      <div>
                        <p className="text-sm text-gray-400">Location</p>
                        <p>{jobData.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-x-3">
                      {jobData.is_remote ? (
                        <RiHomeOfficeLine className="text-primary-400 mt-0.5 size-5" />
                      ) : (
                        <RiBuilding2Line className="text-primary-400 mt-0.5 size-5" />
                      )}
                      <div>
                        <p className="text-sm text-gray-400">Work Mode</p>
                        <p>{jobData.is_remote ? "Remote" : "On-site"}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-x-3">
                      <RiMoneyDollarCircleLine className="text-primary-400 mt-0.5 size-5" />
                      <div>
                        <p className="text-sm text-gray-400">Salary</p>
                        <p>Competitive</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-x-3">
                      <RiCalendarLine className="text-primary-400 mt-0.5 size-5" />
                      <div>
                        <p className="text-sm text-gray-400">Posted</p>
                        <p>Recently</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-primary-100/15 border-t pt-6">
                  <h3 className="mb-4 font-semibold">About {jobData.company}</h3>
                  <p className="text-sm text-gray-400">
                    {jobData.company} is looking for talented individuals to join their team. Apply now to learn more
                    about this opportunity.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>
      <Footer />
    </>
  );
};

export default Page;
