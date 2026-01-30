import { RiBuilding2Line, RiHomeOfficeLine, RiMapPinLine, RiTimeLine } from "@remixicon/react";
import Link from "next/link";
import React from "react";

import type { JobProps } from "@/types";

interface Props {
  job: JobProps;
}

export const Card = ({ job }: Props) => {
  return (
    <Link
      className="border-primary-100/15 hover:border-primary-400/50 group flex h-full flex-col justify-between gap-y-4 border bg-black/20 p-5 transition-all duration-300 hover:bg-black/40"
      href={`/jobs/${job.id}`}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-x-2">
          <h3 className="group-hover:text-primary-400 text-base font-medium capitalize transition-colors sm:text-lg">
            {job.title}
          </h3>
          <span
            className={`shrink-0 px-2 py-0.5 text-xs font-medium ${
              job.is_remote ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"
            }`}
          >
            {job.is_remote ? "Remote" : "On-site"}
          </span>
        </div>
        <p className="text-primary-400 text-sm font-medium">{job.company}</p>
        <p className="line-clamp-2 text-xs text-gray-400 sm:text-sm">{job.description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
        <div className="flex items-center gap-x-1">
          <RiMapPinLine className="size-3.5" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-x-1">
          {job.is_remote ? <RiHomeOfficeLine className="size-3.5" /> : <RiBuilding2Line className="size-3.5" />}
          <span className="capitalize">{job.employment_type?.toLowerCase() || "Full-time"}</span>
        </div>
        <div className="flex items-center gap-x-1">
          <RiTimeLine className="size-3.5" />
          <span>Posted recently</span>
        </div>
      </div>
    </Link>
  );
};
