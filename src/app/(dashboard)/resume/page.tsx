"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

import { Avatar, ScrollArea } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/user";
import { getInitials } from "@/lib";

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
  const { user } = useUserStore();

  if (!user) {
    return <div className="grid h-full w-full place-items-center"></div>;
  }

  return (
    <ScrollArea>
      <motion.div
        className="w-full space-y-4 text-black"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="flex items-center justify-end gap-x-4" variants={itemVariants}>
          <Button size="sm">Edit Resume</Button>
          <Button asChild size="sm">
            <Link href="/resume/export">Export Resume</Link>
          </Button>
        </motion.div>
        <motion.div className="bg-primary-100/25 flex items-center gap-x-5 p-4" variants={itemVariants}>
          <Avatar
            alt={getInitials(user.name)}
            className="bg-primary-400 size-20 text-4xl font-bold text-black"
            src={user.image}
          />
          <div className="space-y-1">
            <p className="text-3xl font-semibold">{user.name}</p>
            <div className="flex items-center gap-x-3 text-gray-400">
              <p className="text-sm">{user.email}</p>
            </div>
          </div>
        </motion.div>
        <motion.div className="w-full" variants={itemVariants}></motion.div>
      </motion.div>
    </ScrollArea>
  );
};

export default Page;
