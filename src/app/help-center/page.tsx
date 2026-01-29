"use client";

import { RiQuestionLine } from "@remixicon/react";
import { motion } from "framer-motion";
import React from "react";

import { Footer, Navbar } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks";

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
  const [search, setSearch] = React.useState("");
  useDebounce(search, 500);

  return (
    <>
      <Navbar />
      <div className="w-screen overflow-hidden px-4 sm:px-0">
        <motion.section
          className="container mx-auto max-w-6xl space-y-6 py-20 sm:py-32"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="w-full space-y-4" variants={itemVariants}>
            <Badge>
              <RiQuestionLine />
              Get Help
            </Badge>
            <h1 className="text-4xl font-semibold sm:text-6xl">Help Center</h1>
            <p className="text-sm text-gray-400 sm:text-base">Get access to the best talents accross the globe</p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Input onChange={(e) => setSearch(e.target.value)} type="search" value={search} wrapperClassName="w-1/2" />
          </motion.div>
        </motion.section>
        <motion.section
          className="container mx-auto max-w-6xl space-y-2 py-10 sm:py-28"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className=""></div>
        </motion.section>
      </div>
      <Footer />
    </>
  );
};

export default Page;
