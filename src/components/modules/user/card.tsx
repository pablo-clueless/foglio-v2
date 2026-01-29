import { MapPin, Briefcase, Award, Star, CheckCircle2 } from "lucide-react";
import { type Variants, motion } from "framer-motion";
import Link from "next/link";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { UserProps } from "@/types";
import { getInitials } from "@/lib";

interface Props {
  user: UserProps;
  index?: number;
}

export const Card = ({ user, index = 0 }: Props) => {
  const [isHovered, setIsHovered] = React.useState(false);

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

  const imageVariants: Variants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
  } as const;

  const overlayVariants: Variants = {
    rest: { opacity: 0, y: 20 },
    hover: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
  } as const;

  const displaySkills = user.skills?.slice(0, 3) || [];
  const experienceYears = user.experiences?.[0]
    ? new Date().getFullYear() - new Date(user.experiences[0].created_at).getFullYear()
    : 0;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      <Link href={`/talent-pool/${user.id}`} className="block">
        <motion.div
          className="border-primary-100/15 to-primary-100/5 relative overflow-hidden border bg-gradient-to-br from-transparent backdrop-blur-sm transition-all duration-300"
          animate={{
            borderColor: isHovered ? "rgba(var(--primary-100), 0.3)" : "rgba(var(--primary-100), 0.15)",
          }}
        >
          <div className="relative aspect-[3/4] overflow-hidden">
            <motion.div variants={imageVariants} animate={isHovered ? "hover" : "rest"}>
              <Avatar className="size-full rounded-none">
                <AvatarImage src={user.image} className="object-cover" />
                <AvatarFallback className="from-primary-100/20 to-primary-100/5 rounded-none bg-gradient-to-br text-4xl font-bold">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
            </motion.div>

            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
              animate={{
                opacity: isHovered ? 1 : 0.7,
              }}
              transition={{ duration: 0.3 }}
            />

            <div className="absolute top-3 right-3 flex flex-col gap-2">
              {user.verified && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 200 }}
                >
                  <div className="flex items-center gap-1 rounded-full bg-blue-500/90 px-2 py-1 backdrop-blur-sm">
                    <CheckCircle2 className="size-3 text-white" />
                    <span className="text-xs font-medium text-white">Verified</span>
                  </div>
                </motion.div>
              )}
              {user.is_premium && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
                >
                  <div className="flex items-center gap-1 rounded-full bg-amber-500/90 px-2 py-1 backdrop-blur-sm">
                    <Star className="size-3 fill-white text-white" />
                    <span className="text-xs font-medium text-white">Premium</span>
                  </div>
                </motion.div>
              )}
            </div>

            <motion.div
              className="absolute inset-x-0 bottom-0 p-4 text-white"
              variants={overlayVariants}
              animate={isHovered ? "hover" : "rest"}
            >
              <div className="space-y-3">
                <div>
                  <h3 className="line-clamp-1 text-xl leading-tight font-bold">{user.name}</h3>
                  <p className="line-clamp-1 text-sm font-medium text-gray-300">{user.role}</p>
                </div>

                {user.headline && <p className="line-clamp-2 text-xs text-gray-400">{user.headline}</p>}

                <div className="flex flex-wrap gap-2">
                  {user.location && (
                    <div className="flex items-center gap-1 text-xs text-gray-300">
                      <MapPin className="size-3" />
                      <span className="line-clamp-1">{user.location}</span>
                    </div>
                  )}
                  {experienceYears > 0 && (
                    <div className="flex items-center gap-1 text-xs text-gray-300">
                      <Briefcase className="size-3" />
                      <span>{experienceYears}+ years</span>
                    </div>
                  )}
                  {user.certifications && user.certifications.length > 0 && (
                    <div className="flex items-center gap-1 text-xs text-gray-300">
                      <Award className="size-3" />
                      <span>{user.certifications.length} certs</span>
                    </div>
                  )}
                </div>

                {displaySkills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {displaySkills.map((skill, i) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * i }}
                      >
                        <Badge
                          variant="secondary"
                          className="bg-white/10 text-xs font-medium text-white backdrop-blur-sm hover:bg-white/20"
                        >
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                    {user.skills && user.skills.length > 3 && (
                      <Badge
                        variant="secondary"
                        className="bg-white/10 text-xs font-medium text-white backdrop-blur-sm"
                      >
                        +{user.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          <motion.div
            className="from-primary-100 via-primary-200 to-primary-100 absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "left" }}
          />

          <motion.div
            className="border-primary-100/0 absolute inset-0 border-2 transition-colors duration-300"
            animate={{
              borderColor: isHovered ? "rgba(var(--primary-100), 0.4)" : "rgba(var(--primary-100), 0)",
            }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
};
