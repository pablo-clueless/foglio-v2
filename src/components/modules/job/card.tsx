import { RiBuilding2Line, RiHomeOfficeLine } from "@remixicon/react";
import Link from "next/link";
import React from "react";

import type { JobProps } from "@/types";

interface Props {
  job: JobProps;
}

export const Card = ({ job }: Props) => {
  return (
    <Link
      className="border-primary-100/15 hover:bg-primary-100/25 flex flex-col justify-between space-y-2 rounded-md border p-4 transition-colors duration-500"
      href={`/jobs/${job.id}`}
    >
      <p className="truncate text-sm capitalize sm:text-base">{job.title}</p>
      <div className="text-primary-400 flex items-center gap-x-4">
        <p className="text-xs">{job.company}</p>
        <span className="bg-primary-400 size-1 rounded-full"></span>
        <p className="text-xs">{job.location}</p>
      </div>
      <p className="text-xs text-gray-400">{job.description}</p>
      <div className="text-primary-400 flex items-center gap-x-4">
        {job.is_remote ? (
          <RiHomeOfficeLine className="text-primary-400 size-4" />
        ) : (
          <RiBuilding2Line className="text-primary-400 size-4" />
        )}
      </div>
    </Link>
  );
};
