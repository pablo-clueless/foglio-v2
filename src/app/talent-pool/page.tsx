"use client";

import { RiAccountPinCircleLine, RiArrowRightLine, RiGlobalLine, RiLoaderLine, RiSearchLine } from "@remixicon/react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React from "react";

import { Footer, Navbar, Pagination } from "@/components/shared";
import { Card } from "@/components/modules/user";
import { Button } from "@/components/ui/button";
import { useGetUsersQuery } from "@/api/user";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

const PAGE_SIZE = 12;

const Page = () => {
  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(1);

  const q = useDebounce(query, 500);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  const { data: users, isFetching } = useGetUsersQuery(
    { page, query: q, size: PAGE_SIZE, user_type: "talent" },
    { refetchOnFocus: true, refetchOnMountOrArgChange: true },
  );

  React.useEffect(() => {
    setPage(1);
  }, [q]);

  return (
    <>
      <Navbar />
      <div className="w-screen overflow-hidden">
        <section className="bg-grid-1 min-h-[90vh] w-full bg-black/85 bg-cover bg-no-repeat bg-blend-overlay">
          <div className="container mx-auto grid h-full max-w-6xl place-items-center px-4 py-20 sm:py-32">
            <motion.div
              className="flex max-w-4xl flex-col items-center space-y-6 text-center sm:space-y-10"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <Badge>
                  <RiAccountPinCircleLine />
                  Talent Pool
                </Badge>
              </motion.div>
              <motion.h1 className="text-4xl font-semibold sm:text-6xl" variants={itemVariants}>
                Discover top <span className="text-primary-400">talent</span> in our pool
              </motion.h1>
              <motion.p className="max-w-2xl text-sm text-gray-400 sm:text-lg" variants={itemVariants}>
                Access a curated network of skilled professionals, streamline your hiring process, and connect with
                candidates ready to make an impact. Find the perfect fit for your team, completely free.
              </motion.p>
            </motion.div>
            <motion.section
              className="container mx-auto flex max-w-6xl flex-col items-center space-y-10 py-10 sm:space-y-20 sm:py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative w-full max-w-3xl">
                <RiSearchLine className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-gray-400" />
                <Input
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search talents by role, keyword or location..."
                  type="search"
                  value={query}
                  className="pl-12"
                  wrapperClassName="w-full"
                />
              </div>
              <div className="w-full">
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
                      <p className="text-gray-400">Loading talents...</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={page + q}
                      className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5"
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0 }}
                    >
                      {(users?.data.total_items || 0) > 0 ? (
                        users?.data.data.map((user) => (
                          <motion.div key={user.id} variants={cardVariants}>
                            <Card key={user.id} user={user} />
                          </motion.div>
                        ))
                      ) : (
                        <motion.div
                          className="col-span-full flex flex-col items-center justify-center py-20 text-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <RiSearchLine className="mb-4 size-12 text-gray-600" />
                          <p className="text-lg text-gray-400">No talents found matching &quot;{q}&quot;</p>
                          <p className="text-sm text-gray-500">Try adjusting your search terms</p>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
                {(users?.data.total_items || 0) > PAGE_SIZE && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Pagination
                      current={page}
                      limit={PAGE_SIZE}
                      onPageChange={handlePageChange}
                      total={users?.data.total_items || 0}
                      className="border-primary-100/15 rounded-lg border bg-black/20 p-4"
                      buttonClassName="hover:bg-primary-400/20"
                    />
                  </motion.div>
                )}
              </div>
            </motion.section>
          </div>
        </section>
        <motion.section
          className="bg-grid-2 bg-black/50 bg-cover bg-center bg-no-repeat py-16 bg-blend-overlay sm:py-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto flex max-w-4xl flex-col items-center gap-y-6 px-4 text-center sm:gap-y-8">
            <Badge>
              <RiGlobalLine />
              Join 500+ Companies
            </Badge>
            <h2 className="text-3xl font-semibold sm:text-5xl">Ready to build your dream team?</h2>
            <p className="max-w-2xl text-gray-400">
              Join hundreds of companies already using Foglio to hire top talent faster. Create your free account today
              and start connecting with qualified candidates.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Button asChild size="xl">
                <Link href="/signup">
                  Start Hiring Today <RiArrowRightLine className="ml-2" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="default-outline">
                <Link href="/help-center">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </motion.section>
      </div>
      <Footer />
    </>
  );
};

export default Page;
