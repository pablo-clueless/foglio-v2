"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

import { Logo } from "@/components/shared";

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
  return (
    <motion.div
      className="flex w-[300px] flex-col items-center gap-y-20 sm:w-[400px]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Link href="/">
          <Logo mode="light" />
        </Link>
      </motion.div>
      <motion.div className="w-full space-y-4" variants={itemVariants}>
        Aouth redirect here
      </motion.div>
    </motion.div>
  );
};

export default Page;
