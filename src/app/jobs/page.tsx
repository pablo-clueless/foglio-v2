"use client";

import { RiBriefcase4Line, RiLoaderLine, RiSearchLine } from "@remixicon/react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

import { Footer, Navbar, Pagination } from "@/components/shared";
import { Card } from "@/components/modules/job";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useGetJobsQuery } from "@/api/job";
import { useDebounce } from "@/hooks";

const PAGE_SIZE = 12;

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
} as const;

const Page = () => {
  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const q = useDebounce(query, 500);

  const { data: jobs, isFetching } = useGetJobsQuery(
    { page, size: PAGE_SIZE },
    { refetchOnFocus: true, refetchOnMountOrArgChange: true },
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  React.useEffect(() => {
    setPage(1);
  }, [q]);

  return (
    <>
      <Navbar />
      <div className="w-screen overflow-hidden">
        <motion.section
          className="container mx-auto max-w-6xl space-y-2 px-4 py-20 sm:px-0 sm:py-32"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <Badge>
            <RiBriefcase4Line />
            Job Openings
          </Badge>
          <h1 className="text-4xl font-semibold sm:text-6xl">Find the perfect job for you</h1>
          <p className="text-sm text-gray-400 sm:text-base">
            Discover {jobs?.data.total_items} opportunities waiting for you
          </p>
        </motion.section>
        <motion.section
          className="container mx-auto flex max-w-6xl flex-col items-center px-4 py-10 sm:px-0 sm:py-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative w-full max-w-3xl">
            <RiSearchLine className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-gray-400" />
            <Input
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search jobs by title, company, or keyword..."
              type="search"
              value={query}
              className="pl-12"
              wrapperClassName="w-full"
            />
          </div>
        </motion.section>
        <section className="container mx-auto max-w-6xl space-y-8 py-10 sm:py-20">
          <AnimatePresence mode="wait">
            {isFetching ? (
              <motion.div
                key="loading"
                className="flex min-h-[400px] flex-col items-center justify-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <RiLoaderLine className="text-primary-400 mb-4 size-10 animate-spin" />
                <p className="text-gray-400">Loading jobs...</p>
              </motion.div>
            ) : (
              <motion.div
                key={page + q}
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
              >
                {(jobs?.data.total_items || 0) > 0 ? (
                  jobs?.data.data.map((job) => (
                    <motion.div key={job.id} variants={cardVariants}>
                      <Card job={job} />
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    className="col-span-full flex flex-col items-center justify-center py-20 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <RiSearchLine className="mb-4 size-12 text-gray-600" />
                    <p className="text-lg text-gray-400">No jobs found matching &quot;{q}&quot;</p>
                    <p className="text-sm text-gray-500">Try adjusting your search terms</p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          {(jobs?.data.total_items || 0) > PAGE_SIZE && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Pagination
                current={page}
                limit={PAGE_SIZE}
                onPageChange={handlePageChange}
                total={jobs?.data.total_items || 0}
                className="border-primary-100/15 border bg-black/20 p-4"
                buttonClassName="hover:bg-primary-400/20"
              />
            </motion.div>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Page;
