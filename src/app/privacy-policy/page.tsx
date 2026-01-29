"use client";

import { RiShieldLine } from "@remixicon/react";
import { motion } from "framer-motion";
import React from "react";

import { Footer, Navbar } from "@/components/shared";
import { Badge } from "@/components/ui/badge";

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

const Page = () => {
  return (
    <>
      <Navbar />
      <div className="w-screen overflow-hidden px-4 sm:px-0">
        <motion.section
          className="container mx-auto max-w-6xl space-y-2 py-20 sm:py-32"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Badge>
              <RiShieldLine />
              Privacy & Security
            </Badge>
          </motion.div>
          <motion.h1 className="text-4xl font-semibold sm:text-6xl" variants={itemVariants}>
            Privacy Policy
          </motion.h1>
          <motion.p className="text-sm text-gray-400 sm:text-base" variants={itemVariants}>
            Last updated: {new Date().toLocaleDateString()}
          </motion.p>
        </motion.section>
      </div>
      <Footer />
    </>
  );
};

export default Page;
