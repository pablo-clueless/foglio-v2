import { RiStarFill, RiVerifiedBadgeFill, RiVipCrownFill } from "@remixicon/react";
import { motion } from "framer-motion";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { ReviewProps } from "@/types";
import { cn } from "@/lib";

interface Props {
  review: ReviewProps;
  index?: number;
}

export const Card = ({ review, index = 0 }: Props) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  } as const;

  const starContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2 + index * 0.1,
      },
    },
  };

  const starVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  } as const;

  const commentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.5 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  } as const;

  const avatarVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.7 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  } as const;

  const hoverVariants = {
    rest: { scale: 1, y: 0 },
    hover: {
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  } as const;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative h-full w-full shrink-0"
    >
      <motion.div
        variants={hoverVariants}
        animate={isHovered ? "hover" : "rest"}
        className="border-primary-100/15 to-primary-100/5 relative h-full border bg-gradient-to-br from-transparent p-6 backdrop-blur-sm transition-colors duration-300 sm:p-8"
      >
        <motion.div
          className="from-primary-100/10 absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300"
          animate={{ opacity: isHovered ? 1 : 0 }}
        />
        <div className="relative flex h-full flex-col justify-between gap-y-6">
          <div className="flex flex-col items-start gap-y-6">
            <motion.div variants={starContainerVariants} className="flex items-center gap-x-1">
              {stars.map((star) => (
                <motion.div key={star} variants={starVariants}>
                  <RiStarFill
                    className={cn(
                      "size-5 transition-all duration-300 sm:size-6",
                      star <= review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300",
                      isHovered && star <= review.rating && "scale-110 drop-shadow-lg",
                    )}
                  />
                </motion.div>
              ))}
            </motion.div>
            <motion.div variants={commentVariants} className="relative">
              <motion.p
                className="text-xl leading-relaxed sm:text-3xl lg:text-2xl"
                animate={{
                  color: isHovered ? "var(--primary-400)" : "var(--background)",
                }}
                transition={{ duration: 0.3 }}
              >
                &ldquo;{review.comment}&rdquo;
              </motion.p>
              <motion.div
                className="bg-primary-100 absolute -top-2 -left-2 h-1"
                initial={{ width: 0 }}
                whileInView={{ width: "40px" }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              />
            </motion.div>
          </div>
          <motion.div variants={avatarVariants} className="flex items-center gap-x-4">
            <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
              <Avatar className="hover:ring-primary-100/30 size-14 rounded-none ring-2 ring-transparent transition-all duration-300 sm:size-20">
                <AvatarImage src={review.user.image} />
                <AvatarFallback className="bg-primary-100/10 rounded-none">{review.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </motion.div>
            <div className="space-y-1">
              <motion.div
                className="flex items-center gap-1.5"
                animate={{
                  x: isHovered ? 4 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-sm font-semibold sm:text-base lg:text-lg">{review.user.name}</span>
                {review.user.verified && <RiVerifiedBadgeFill className="size-4 text-blue-500 sm:size-5" />}
                {review.user.is_premium && <RiVipCrownFill className="size-4 text-yellow-500 sm:size-5" />}
              </motion.div>
              <motion.p
                className="text-xs text-gray-400 sm:text-sm"
                animate={{
                  x: isHovered ? 4 : 0,
                }}
                transition={{ duration: 0.3, delay: 0.05 }}
              >
                {review.user.is_recruiter ? "Recruiter" : "Talent"}
              </motion.p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
