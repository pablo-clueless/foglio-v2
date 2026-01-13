"use client";

import { RiBriefcase4Line } from "@remixicon/react";
import React from "react";

import { useDebounce, useInfiniteScroll } from "@/hooks";
import { Footer, Navbar } from "@/components/shared";
import { Card } from "@/components/modules/job";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { paginate } from "@/lib";

import { MOCK_JOBS } from "@/__mock__";

const PAGE_SIZE = 40;

const Page = () => {
  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const q = useDebounce(query, 500);

  const filtered = React.useMemo(() => {
    if (q.trim() === "") return MOCK_JOBS;
    return MOCK_JOBS.filter((job) => job.title.toLowerCase().includes(q.toLowerCase()));
  }, [q]);

  const fetchNextPage = () => setPage((page) => page + 1);

  const paginated = paginate(filtered, page, PAGE_SIZE, filtered.length);
  const { items, ref } = useInfiniteScroll({
    data: filtered,
    fetchNextPage,
    hasNextPage: paginated.length < filtered.length,
    isFetchingNextPage: false,
  });

  return (
    <>
      <Navbar />
      <div className="w-screen overflow-hidden">
        <section className="container mx-auto max-w-6xl space-y-2 py-10 sm:py-28">
          <Badge>
            <RiBriefcase4Line />
            Job Openings
          </Badge>
          <h1 className="text-4xl font-semibold sm:text-6xl">Find the perfect job for you</h1>
          <p className="text-sm text-gray-400 sm:text-base"></p>
        </section>
        <section className="container mx-auto flex max-w-6xl flex-col items-center py-10 sm:py-20">
          <Input onChange={(e) => setQuery(e.target.value)} type="search" value={query} wrapperClassName="max-w-3xl" />
        </section>
        <section className="container mx-auto max-w-6xl space-y-4 py-10 sm:py-20">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3" ref={ref}>
            {items.map((job) => (
              <Card job={job} key={job.id} />
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Page;
