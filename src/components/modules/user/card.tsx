import { MapPin, Briefcase, CheckCircle2 } from "lucide-react";
import { type Variants, motion } from "framer-motion";
import Link from "next/link";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { UserProps } from "@/types";
import { getInitials } from "@/lib";

interface Props {
  user: UserProps;
  index?: number;
}

export const Card = ({ user, index = 0 }: Props) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: ["easeInOut"],
      },
    },
  } as const;

  const skills = user.skills?.slice(0, 3) || [];
  const experienceYears = user.experiences?.[0]
    ? new Date().getFullYear() - new Date(user.experiences[0].start_date).getFullYear()
    : 0;

  return (
    <motion.div
      className="group relative overflow-hidden"
      initial="hidden"
      variants={containerVariants}
      viewport={{ once: false, margin: "-50px" }}
      whileInView="visible"
    >
      <Link href={`/talent-pool/${user.id}`} className="relative block">
        <motion.div className="border-primary-100/15 group-hover:bg-primary-100/5 flex aspect-4/5 flex-col items-center justify-between gap-3 border p-4 transition-colors duration-500">
          <div className="relative">
            <Avatar className="size-16 transition-all duration-500 group-hover:scale-[1.04] sm:size-24">
              <AvatarImage src={user.image} />
              <AvatarFallback className="text-xl font-semibold sm:text-3xl">{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            {user.verified && <CheckCircle2 className="absolute -right-1 -bottom-1 size-5 fill-blue-500 text-white" />}
          </div>
          <div className="flex w-full flex-1 flex-col items-center justify-center gap-2 text-center">
            <div>
              <p className="text-primary-400 line-clamp-1 text-sm">{user.name}</p>
              <p className="line-clamp-1 text-xs text-gray-400">{user.role ?? "Professional"}</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <MapPin className="size-3" />
              <span className="line-clamp-1">{user.location || "No Location"}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Briefcase className="size-3" />
              <span>{experienceYears}+ years</span>
            </div>
          </div>
          {skills.length > 0 ? (
            <div className="flex w-full items-center justify-center gap-1 overflow-hidden whitespace-nowrap">
              <p className="truncate px-1 py-0.5 text-[10px] sm:px-1.5">{skills.join(", ")}</p>
            </div>
          ) : (
            <div className="text-[10px]">No skills added</div>
          )}
        </motion.div>
      </Link>
    </motion.div>
  );
};
