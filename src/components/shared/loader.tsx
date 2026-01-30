"use client";

import { type Variants, motion } from "framer-motion";
import React from "react";

const dotVariants: Variants = {
  animate: (i: number) => ({
    y: [0, -12, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      delay: i * 0.15,
      ease: ["easeInOut"],
    },
  }),
} as const;

const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.3, 0.1, 0.3],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: ["easeInOut"],
    },
  },
} as const;

const spinVariants: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: ["linear"],
    },
  },
} as const;

interface LoaderProps {
  variant?: "dots" | "spinner" | "pulse";
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
}

export const Loader = ({ variant = "dots", size = "md", fullScreen = true }: LoaderProps) => {
  const sizeClasses = {
    sm: "gap-1",
    md: "gap-2",
    lg: "gap-3",
  };

  const dotSizes = {
    sm: "size-1.5",
    md: "size-2.5",
    lg: "size-4",
  };

  const spinnerSizes = {
    sm: "size-6",
    md: "size-10",
    lg: "size-16",
  };

  const containerClass = fullScreen
    ? "fixed inset-0 z-40 grid h-screen w-screen place-items-center bg-black backdrop-blur-sm"
    : "flex items-center justify-center p-4";

  return (
    <motion.div
      className={containerClass}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {variant === "dots" && (
        <div className={`flex items-center ${sizeClasses[size]}`}>
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className={`${dotSizes[size]} bg-primary-400`}
              custom={i}
              variants={dotVariants}
              animate="animate"
            />
          ))}
        </div>
      )}

      {variant === "spinner" && (
        <div className="relative">
          <motion.div
            className={`${spinnerSizes[size]} border-t-primary-400 border-2 border-gray-200`}
            variants={spinVariants}
            animate="animate"
          />
          <motion.div
            className={`absolute inset-0 ${spinnerSizes[size]} border-primary-400/20 border-2`}
            variants={pulseVariants}
            animate="animate"
          />
        </div>
      )}

      {variant === "pulse" && (
        <div className="relative flex items-center justify-center">
          <motion.div
            className={`absolute ${spinnerSizes[size]} bg-primary-400`}
            variants={pulseVariants}
            animate="animate"
          />
          <motion.div
            className={`${dotSizes[size]} bg-primary-400`}
            animate={{
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      )}
    </motion.div>
  );
};
