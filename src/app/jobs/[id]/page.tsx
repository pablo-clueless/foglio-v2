"use client";

import { RiBuilding2Line, RiHomeOfficeLine } from "@remixicon/react";
import { useParams } from "next/navigation";
import React from "react";

import { Footer, Navbar } from "@/components/shared";
import { Badge } from "@/components/ui/badge";

import { MOCK_JOBS } from "@/__mock__";

const Page = () => {
  const id = useParams().id as string;

  const job = MOCK_JOBS.find((job) => job.id === id);

  if (!job) {
    return (
      <>
        <Navbar />
        <div className="w-screen overflow-hidden">
          <section className="container mx-auto grid h-[400px] max-w-6xl place-items-center py-10 sm:py-28">
            <div className="flex w-full flex-col items-center gap-y-4">
              <p>Job not found</p>
            </div>
          </section>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="w-screen overflow-hidden">
        <section className="container mx-auto max-w-6xl space-y-4 py-10 sm:py-28">
          <Badge>
            {job.is_remote ? <RiHomeOfficeLine /> : <RiBuilding2Line />}
            {job.is_remote ? "Remote" : "On-site"}
          </Badge>
          <div>
            <h1 className="text-4xl font-semibold sm:text-6xl">{job.title}</h1>
            <div className="text-primary-400 flex items-center gap-x-4">
              <p className="text-sm sm:text-base">{job.company}</p>
              <span className="bg-primary-400 size-1 rounded-full"></span>
              <p className="text-sm sm:text-base">{job.location}</p>
              <span className="bg-primary-400 size-1 rounded-full"></span>
              <p className="text-sm capitalize sm:text-base">{job.employment_type.toLowerCase()}</p>
            </div>
          </div>
          <div className="">
            <p className="text-sm text-gray-400 sm:text-base">{job.description}</p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Page;
