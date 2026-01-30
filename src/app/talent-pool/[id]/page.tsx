"use client";

import { type Variants, motion } from "framer-motion";
import { useParams } from "next/navigation";
import Link from "next/link";
import React from "react";
import {
  RiMapPinLine,
  RiMailLine,
  RiPhoneLine,
  RiBriefcaseLine,
  RiAwardLine,
  RiCodeLine,
  RiGraduationCapLine,
  RiGlobalLine,
  RiCheckboxCircleLine,
  RiStarFill,
  RiCalendarLine,
  RiBuilding2Line,
  RiLinkedinBoxFill,
  RiGithubFill,
  RiTwitterXFill,
  RiInstagramFill,
  RiFacebookBoxFill,
  RiYoutubeFill,
  RiArticleLine,
  RiArrowLeftLine,
  RiShareLine,
  RiDownloadLine,
  RiExternalLinkLine,
  RiUserLine,
} from "@remixicon/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Footer, Navbar, Loader } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGetUserQuery } from "@/api/user";
import { getInitials } from "@/lib";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const socialLinks = [
  { key: "linkedin", icon: RiLinkedinBoxFill, label: "LinkedIn", color: "hover:text-blue-500" },
  { key: "gitHub", icon: RiGithubFill, label: "GitHub", color: "hover:text-gray-300" },
  { key: "twitter", icon: RiTwitterXFill, label: "Twitter", color: "hover:text-gray-300" },
  { key: "instagram", icon: RiInstagramFill, label: "Instagram", color: "hover:text-pink-500" },
  { key: "facebook", icon: RiFacebookBoxFill, label: "Facebook", color: "hover:text-blue-600" },
  { key: "youtube", icon: RiYoutubeFill, label: "YouTube", color: "hover:text-red-500" },
  { key: "blog", icon: RiArticleLine, label: "Blog", color: "hover:text-green-500" },
] as const;

const Page = () => {
  const id = useParams().id as string;
  const { data, isLoading, isError } = useGetUserQuery(id, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    skip: !id,
  });

  const user = data?.data;

  // TODO: Replace with actual API call when endpoint is ready
  const similarTalents = React.useMemo(() => {
    if (!user) return [];
    // Placeholder data - will be replaced with actual API data
    return [];
  }, [user]);

  const activeSocialLinks = React.useMemo(() => {
    if (!user?.social_media) return [];
    return socialLinks.filter((link) => user.social_media?.[link.key as keyof typeof user.social_media]);
  }, [user]);

  const totalExperience = React.useMemo(() => {
    if (!user?.experiences?.length) return 0;
    const sortedExp = [...user.experiences].sort(
      (a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime(),
    );
    const earliest = new Date(sortedExp[0].start_date);
    return new Date().getFullYear() - earliest.getFullYear();
  }, [user?.experiences]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="grid h-screen w-screen place-items-center bg-black">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Loader />
          </motion.div>
        </div>
      </>
    );
  }

  if (isError || !user) {
    return (
      <>
        <Navbar />
        <div className="grid h-screen w-screen place-items-center bg-black">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto mb-6 flex size-20 items-center justify-center bg-white/5"
            >
              <RiUserLine className="size-10 text-gray-500" />
            </motion.div>
            <h2 className="mb-2 text-2xl font-bold text-white">Talent not found</h2>
            <p className="mb-6 text-gray-400">The profile you&apos;re looking for doesn&apos;t exist.</p>
            <Button asChild variant="outline">
              <Link href="/talent-pool">
                <RiArrowLeftLine className="mr-2 size-4" />
                Back to Talent Pool
              </Link>
            </Button>
          </motion.div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="w-screen overflow-hidden bg-black">
        <section className="bg-grid-1 relative min-h-[80vh] w-full bg-black/90 bg-cover bg-no-repeat bg-blend-overlay">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black" />
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <div className="relative z-10 container mx-auto max-w-7xl px-4 py-20 sm:py-32">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <Button asChild variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Link href="/talent-pool">
                  <RiArrowLeftLine className="mr-2 size-4" />
                  Back to Talent Pool
                </Link>
              </Button>
            </motion.div>
            <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
              <motion.div variants={slideInLeft} initial="hidden" animate="visible" className="lg:col-span-1">
                <div className="border-primary-100/10 sticky top-24 border bg-gradient-to-b from-white/5 to-transparent p-6 backdrop-blur-sm">
                  <div className="flex flex-col items-center text-center">
                    <motion.div
                      className="relative mb-6"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        className="from-primary-100/50 absolute -inset-1 bg-gradient-to-r to-purple-500/50 opacity-75 blur-lg"
                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <Avatar className="relative size-40 ring-4 ring-white">
                        <AvatarImage src={user.image} className="object-cover" />
                        <AvatarFallback className="text-2xl font-bold sm:text-4xl">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      {user.verified && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                          className="absolute -right-1 bottom-2"
                        >
                          <div className="flex items-center justify-center bg-blue-500 p-1.5 shadow-lg shadow-blue-500/50">
                            <RiCheckboxCircleLine className="size-5 text-white" />
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                        {user.is_premium && (
                          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 px-2 py-0.5 text-xs font-bold">
                            <RiStarFill className="mr-1 size-3" />
                            PRO
                          </Badge>
                        )}
                      </div>
                      <p className="text-primary-100 font-medium">{user.role}</p>
                      {user.headline && <p className="text-sm text-gray-400">{user.headline}</p>}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="mt-6 grid w-full grid-cols-3 gap-2 border-y border-white/10 py-4"
                    >
                      <div className="text-center">
                        <motion.p
                          className="text-primary-100 text-xl font-bold"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5, type: "spring" }}
                        >
                          {totalExperience > 0 ? `${totalExperience}+` : "—"}
                        </motion.p>
                        <p className="text-xs text-gray-500">Years Exp</p>
                      </div>
                      <div className="text-center">
                        <motion.p
                          className="text-primary-100 text-xl font-bold"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.6, type: "spring" }}
                        >
                          {user.skills?.length || 0}
                        </motion.p>
                        <p className="text-xs text-gray-500">Skills</p>
                      </div>
                      <div className="text-center">
                        <motion.p
                          className="text-primary-100 text-xl font-bold"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.7, type: "spring" }}
                        >
                          {user.projects?.length || 0}
                        </motion.p>
                        <p className="text-xs text-gray-500">Projects</p>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-4 w-full space-y-3"
                    >
                      {user.location && (
                        <motion.div
                          className="flex items-center gap-3 text-sm text-gray-400"
                          whileHover={{ x: 4 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <RiMapPinLine className="size-4 shrink-0" />
                          <span className="truncate">{user.location}</span>
                        </motion.div>
                      )}
                      {user.email && (
                        <motion.div
                          className="flex items-center gap-3 text-sm text-gray-400"
                          whileHover={{ x: 4 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <RiMailLine className="size-4 shrink-0" />
                          <span className="truncate">{user.email}</span>
                        </motion.div>
                      )}
                      {user.phone && (
                        <motion.div
                          className="flex items-center gap-3 text-sm text-gray-400"
                          whileHover={{ x: 4 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <RiPhoneLine className="size-4 shrink-0" />
                          <span>{user.phone}</span>
                        </motion.div>
                      )}
                    </motion.div>
                    {activeSocialLinks.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-6 w-full"
                      >
                        <p className="mb-3 text-xs font-medium tracking-wider text-gray-500 uppercase">Connect</p>
                        <div className="flex flex-wrap justify-center gap-2">
                          {activeSocialLinks.map((link, i) => {
                            const url = user.social_media?.[link.key as keyof typeof user.social_media];
                            if (!url) return null;
                            const Icon = link.icon;
                            return (
                              <motion.a
                                key={link.key}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.7 + i * 0.05 }}
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className={`bg-white/5 p-2.5 text-gray-400 transition-colors hover:bg-white/10 ${link.color}`}
                                title={link.label}
                              >
                                <Icon className="size-5" />
                              </motion.a>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="mt-6 flex w-full flex-col gap-2"
                    >
                      <Button asChild className="w-full gap-2">
                        <a href={`mailto:${user.email}`}>
                          <RiMailLine className="size-4" />
                          Contact
                        </a>
                      </Button>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm" className="gap-1.5">
                          <RiDownloadLine className="size-4" />
                          Resume
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1.5">
                          <RiShareLine className="size-4" />
                          Share
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8 lg:col-span-2"
              >
                {user.summary && (
                  <motion.div variants={itemVariants} className="space-y-4">
                    <h2 className="text-xl font-bold text-white">About</h2>
                    <p className="leading-relaxed text-gray-300">{user.summary}</p>
                  </motion.div>
                )}
                {user.skills && user.skills.length > 0 && (
                  <motion.div variants={itemVariants} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="from-primary-100/20 flex size-10 items-center justify-center bg-gradient-to-br to-purple-500/20"
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <RiCodeLine className="text-primary-100 size-5" />
                      </motion.div>
                      <h2 className="text-xl font-bold text-white">Skills & Expertise</h2>
                    </div>
                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="flex flex-wrap gap-2"
                    >
                      {user.skills.map((skill) => (
                        <motion.div
                          key={skill}
                          variants={scaleIn}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Badge
                            variant="secondary"
                            className="bg-primary-100/10 hover:bg-primary-100/20 border-primary-100/20 cursor-default border px-3 py-1.5 text-sm font-medium text-white transition-colors"
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}
                {user.experiences && user.experiences.length > 0 && (
                  <motion.div variants={itemVariants} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="from-primary-100/20 flex size-10 items-center justify-center bg-gradient-to-br to-purple-500/20"
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <RiBriefcaseLine className="text-primary-100 size-5" />
                      </motion.div>
                      <h2 className="text-xl font-bold text-white">Experience</h2>
                    </div>
                    <div className="relative space-y-4">
                      <motion.div
                        className="from-primary-100/50 absolute top-0 bottom-0 left-5 w-px bg-gradient-to-b to-transparent"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{ originY: 0 }}
                      />
                      {user.experiences.map((exp, i) => (
                        <motion.div
                          key={exp.id}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1, duration: 0.5 }}
                          className="group relative pl-12"
                        >
                          <motion.div
                            className="bg-primary-100 absolute top-2 left-3.5 size-3 ring-4 ring-black"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 + 0.2, type: "spring" }}
                          />
                          <motion.div
                            className="border-primary-100/10 hover:border-primary-100/30 from-primary-100/5 border bg-gradient-to-br to-transparent p-5 transition-all hover:shadow-lg hover:shadow-purple-500/5"
                            whileHover={{ x: 4 }}
                          >
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                              <div className="space-y-1">
                                <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                                <div className="text-primary-100 flex items-center gap-2 text-sm">
                                  <RiBuilding2Line className="size-4" />
                                  <span className="font-medium">{exp.company_name}</span>
                                  {exp.location && (
                                    <>
                                      <span className="text-gray-600">•</span>
                                      <span className="text-gray-400">{exp.location}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1 text-xs text-gray-400">
                                <RiCalendarLine className="size-3" />
                                <span>
                                  {new Date(exp.start_date).toLocaleDateString("en-US", {
                                    month: "short",
                                    year: "numeric",
                                  })}{" "}
                                  -{" "}
                                  {exp.end_date
                                    ? new Date(exp.end_date).toLocaleDateString("en-US", {
                                        month: "short",
                                        year: "numeric",
                                      })
                                    : "Present"}
                                </span>
                              </div>
                            </div>
                            {exp.description && (
                              <p className="mt-3 text-sm leading-relaxed text-gray-400">{exp.description}</p>
                            )}
                            {exp.technologies && exp.technologies.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-1.5">
                                {exp.technologies.map((tech) => (
                                  <span key={tech} className="bg-white/5 px-2 py-0.5 text-xs text-gray-400">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
                {user.education && user.education.length > 0 && (
                  <motion.div variants={itemVariants} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="from-primary-100/20 flex size-10 items-center justify-center bg-gradient-to-br to-purple-500/20"
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <RiGraduationCapLine className="text-primary-100 size-5" />
                      </motion.div>
                      <h2 className="text-xl font-bold text-white">Education</h2>
                    </div>
                    <div className="grid gap-4">
                      {user.education.map((edu, i) => (
                        <motion.div
                          key={edu.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1, duration: 0.5 }}
                          whileHover={{ y: -2, x: 4 }}
                          className="border-primary-100/10 hover:border-primary-100/30 from-primary-100/5 border bg-gradient-to-br to-transparent p-5 transition-all"
                        >
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div className="space-y-1">
                              <h3 className="text-lg font-bold text-white">{edu.degree}</h3>
                              <p className="text-primary-100 font-medium">{edu.institution}</p>
                              {edu.field && <p className="text-sm text-gray-400">{edu.field}</p>}
                            </div>
                            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1 text-xs text-gray-400">
                              <RiCalendarLine className="size-3" />
                              <span>
                                {new Date(edu.start_date).getFullYear()} -{" "}
                                {edu.end_date ? new Date(edu.end_date).getFullYear() : "Present"}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
                {user.projects && user.projects.length > 0 && (
                  <motion.div variants={itemVariants} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="from-primary-100/20 flex size-10 items-center justify-center bg-gradient-to-br to-purple-500/20"
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <RiCodeLine className="text-primary-100 size-5" />
                      </motion.div>
                      <h2 className="text-xl font-bold text-white">Projects</h2>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {user.projects.map((project, i) => (
                        <motion.div
                          key={project.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1, duration: 0.5 }}
                          whileHover={{ y: -4 }}
                          className="group border-primary-100/10 hover:border-primary-100/30 from-primary-100/5 overflow-hidden border bg-gradient-to-br to-transparent transition-all hover:shadow-lg hover:shadow-purple-500/10"
                        >
                          {project.image && (
                            <div className="aspect-video w-full overflow-hidden bg-white/5">
                              <motion.img
                                src={project.image}
                                alt={project.title}
                                className="size-full object-cover"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.5 }}
                              />
                            </div>
                          )}
                          <div className="p-5">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-bold text-white">{project.title}</h3>
                              {project.url && (
                                <motion.a
                                  href={project.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary-100 hover:text-primary-200 shrink-0 transition-colors"
                                  whileHover={{ scale: 1.2, rotate: 15 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <RiExternalLinkLine className="size-4" />
                                </motion.a>
                              )}
                            </div>
                            {project.description && (
                              <p className="mt-2 line-clamp-2 text-sm text-gray-400">{project.description}</p>
                            )}
                            {project.stack && project.stack.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-1.5">
                                {project.stack.slice(0, 4).map((tech) => (
                                  <span key={tech} className="bg-white/5 px-2 py-0.5 text-xs text-gray-400">
                                    {tech}
                                  </span>
                                ))}
                                {project.stack.length > 4 && (
                                  <span className="bg-white/5 px-2 py-0.5 text-xs text-gray-400">
                                    +{project.stack.length - 4}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
                {user.certifications && user.certifications.length > 0 && (
                  <motion.div variants={itemVariants} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="from-primary-100/20 flex size-10 items-center justify-center bg-gradient-to-br to-purple-500/20"
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <RiAwardLine className="text-primary-100 size-5" />
                      </motion.div>
                      <h2 className="text-xl font-bold text-white">Certifications</h2>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {user.certifications.map((cert, i) => (
                        <motion.div
                          key={cert.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05, duration: 0.4 }}
                          whileHover={{ y: -2, scale: 1.02 }}
                          className="border-primary-100/10 hover:border-primary-100/30 from-primary-100/5 border bg-gradient-to-br to-transparent p-4 transition-all"
                        >
                          <div className="flex items-start gap-3">
                            <motion.div className="shrink-0 bg-amber-500/10 p-2" whileHover={{ rotate: 10 }}>
                              <RiAwardLine className="size-5 text-amber-500" />
                            </motion.div>
                            <div className="min-w-0 flex-1">
                              <h4 className="truncate font-semibold text-white">{cert.name}</h4>
                              <p className="truncate text-sm text-gray-400">{cert.issuer}</p>
                              {cert.issue_date && (
                                <p className="mt-1 text-xs text-gray-500">
                                  {new Date(cert.issue_date).toLocaleDateString("en-US", {
                                    month: "short",
                                    year: "numeric",
                                  })}
                                </p>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
                {user.languages && user.languages.length > 0 && (
                  <motion.div variants={itemVariants} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="from-primary-100/20 flex size-10 items-center justify-center bg-gradient-to-br to-purple-500/20"
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <RiGlobalLine className="text-primary-100 size-5" />
                      </motion.div>
                      <h2 className="text-xl font-bold text-white">Languages</h2>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {user.languages.map((lang, i) => (
                        <motion.div
                          key={lang.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05, duration: 0.3 }}
                          whileHover={{ scale: 1.05 }}
                          className="border-primary-100/20 flex items-center gap-2 border bg-white/5 px-4 py-2"
                        >
                          <span className="font-medium text-white">{lang.name}</span>
                          <span className="text-primary-100 text-sm">• {lang.proficiency}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </section>
        <section className="border-t border-white/5 bg-black py-16">
          <div className="container mx-auto max-w-7xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex items-center justify-between"
            >
              <div>
                <h2 className="text-2xl font-bold text-white">Similar Talents</h2>
                <p className="text-gray-400">Professionals with similar skills and experience</p>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href="/talent-pool">View All</Link>
              </Button>
            </motion.div>

            {similarTalents.length > 0 ? (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
              >
                {/* Similar talents cards will be rendered here when API is ready */}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="border-primary-100/10 border border-dashed py-12 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="mx-auto mb-4 flex size-16 items-center justify-center bg-white/5"
                >
                  <RiUserLine className="size-8 text-gray-600" />
                </motion.div>
                <p className="text-gray-500">Similar talents will appear here</p>
                <p className="mt-1 text-xs text-gray-600">Based on skills and experience</p>
              </motion.div>
            )}
          </div>
        </section>
        <section className="bg-grid-2 bg-black/50 bg-cover bg-center bg-no-repeat py-16 bg-blend-overlay">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="container mx-auto max-w-4xl px-4 text-center"
          >
            <motion.h2
              className="mb-4 text-3xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Interested in {user.name.split(" ")[0]}?
            </motion.h2>
            <motion.p
              className="mb-8 text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Reach out to discuss potential opportunities and collaborations
            </motion.p>
            <motion.div
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Button asChild className="gap-2" size="lg">
                <a href={`mailto:${user.email}`}>
                  <RiMailLine className="size-5" />
                  Send Message
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2">
                <Link href="/talent-pool">
                  <RiArrowLeftLine className="size-5" />
                  Browse More Talents
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Page;
