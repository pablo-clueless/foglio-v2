"use client";

import { type Variants, motion } from "framer-motion";
import { useParams } from "next/navigation";
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
  RiLinkM,
} from "@remixicon/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Navbar, Loader } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGetUserQuery } from "@/api/user";
import { getInitials } from "@/lib";

const Page = () => {
  const id = useParams().id as string;
  const { data, isLoading, isError } = useGetUserQuery(id, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    skip: !id,
  });

  const user = data?.data;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: ["easeInOut"],
      },
    },
  };

  const heroVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: ["easeInOut"],
      },
    },
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="grid h-screen w-screen place-items-center">
          <Loader />
        </div>
      </>
    );
  }

  if (isError || !user) {
    return (
      <>
        <Navbar />
        <div className="grid h-screen w-screen place-items-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Talent not found</h2>
            <p className="text-gray-500">The profile you're looking for doesn't exist.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="w-screen overflow-hidden">
        <section className="bg-grid-1 relative min-h-[90vh] w-full bg-black/85 bg-cover bg-no-repeat bg-blend-overlay">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
          <div className="relative z-10 container mx-auto max-w-6xl px-4 py-20 sm:py-32">
            <motion.div
              variants={heroVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center gap-8 text-center lg:flex-row lg:items-start lg:gap-12 lg:text-left"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative"
              >
                <Avatar className="ring-primary-100/20 size-48 rounded-none ring-4 lg:size-64">
                  <AvatarImage src={user.image} className="object-cover" />
                  <AvatarFallback className="from-primary-100/20 to-primary-100/5 rounded-none bg-gradient-to-br text-6xl font-bold">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                {user.verified && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    className="absolute -right-2 -bottom-2"
                  >
                    <div className="flex items-center gap-1 rounded-full bg-blue-500 px-3 py-1.5 shadow-lg">
                      <RiCheckboxCircleLine className="size-4 text-white" />
                      <span className="text-xs font-bold text-white">Verified</span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
              <div className="flex-1 space-y-6">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                    <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">{user.name}</h1>
                    {user.is_premium && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                      >
                        <Badge className="bg-amber-500 px-3 py-1 text-sm font-bold">
                          <RiStarFill className="mr-1 size-4 fill-white" />
                          Premium
                        </Badge>
                      </motion.div>
                    )}
                  </div>
                  <p className="text-primary-100 text-xl font-semibold sm:text-2xl">{user.role}</p>
                  {user.headline && <p className="text-lg text-gray-300">{user.headline}</p>}
                </div>
                <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
                  {user.location && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <RiMapPinLine className="size-5" />
                      <span>{user.location}</span>
                    </div>
                  )}
                  {user.email && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <RiMailLine className="size-5" />
                      <span>{user.email}</span>
                    </div>
                  )}
                  {user.phone && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <RiPhoneLine className="size-5" />
                      <span>{user.phone}</span>
                    </div>
                  )}
                </div>
                {user.summary && <p className="max-w-3xl leading-relaxed text-gray-400">{user.summary}</p>}
                <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
                  <Button size="lg" className="gap-2">
                    <RiMailLine className="size-5" />
                    Contact Me
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2">
                    <RiLinkM className="size-5" />
                    View Resume
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        <section className="bg-black py-16 sm:py-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="container mx-auto max-w-6xl space-y-16 px-4"
          >
            {user.skills && user.skills.length > 0 && (
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="flex items-center gap-3">
                  <RiCodeLine className="text-primary-100 size-8" />
                  <h2 className="text-3xl font-bold text-white">Skills & Expertise</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {user.skills.map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <Badge
                        variant="secondary"
                        className="bg-primary-100/10 hover:bg-primary-100/20 px-4 py-2 text-base font-medium text-white"
                      >
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            {user.experiences && user.experiences.length > 0 && (
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="flex items-center gap-3">
                  <RiBriefcaseLine className="text-primary-100 size-8" />
                  <h2 className="text-3xl font-bold text-white">Experience</h2>
                </div>
                <div className="space-y-6">
                  {user.experiences.map((exp, i) => (
                    <motion.div
                      key={exp.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="group border-primary-100/20 from-primary-100/5 hover:border-primary-100/40 hover:shadow-primary-100/10 relative rounded-xl border bg-gradient-to-br to-transparent p-6 transition-all hover:shadow-lg"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex-1 space-y-2">
                          <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                          <div className="text-primary-100 flex items-center gap-2">
                            <RiBuilding2Line className="size-5" />
                            <span className="font-medium">{exp.company_name}</span>
                          </div>
                          {exp.description && <p className="text-gray-400">{exp.description}</p>}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <RiCalendarLine className="size-4" />
                          <span>
                            {new Date(exp.start_date).getFullYear()} -{" "}
                            {exp.end_date ? new Date(exp.end_date).getFullYear() : "Present"}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            {user.education && user.education.length > 0 && (
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="flex items-center gap-3">
                  <RiGraduationCapLine className="text-primary-100 size-8" />
                  <h2 className="text-3xl font-bold text-white">Education</h2>
                </div>
                <div className="space-y-6">
                  {user.education.map((edu, i) => (
                    <motion.div
                      key={edu.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="group border-primary-100/20 from-primary-100/5 hover:border-primary-100/40 hover:shadow-primary-100/10 rounded-xl border bg-gradient-to-br to-transparent p-6 transition-all hover:shadow-lg"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex-1 space-y-2">
                          <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                          <p className="text-primary-100 font-medium">{edu.institution}</p>
                          {edu.field && <p className="text-gray-400">{edu.field}</p>}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <RiCalendarLine className="size-4" />
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
            {user.certifications && user.certifications.length > 0 && (
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="flex items-center gap-3">
                  <RiAwardLine className="text-primary-100 size-8" />
                  <h2 className="text-3xl font-bold text-white">Certifications</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {user.certifications.map((cert, i) => (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                      whileHover={{ y: -4 }}
                      className="border-primary-100/20 from-primary-100/5 hover:border-primary-100/40 hover:shadow-primary-100/10 rounded-xl border bg-gradient-to-br to-transparent p-4 transition-all hover:shadow-lg"
                    >
                      <div className="space-y-2">
                        <h4 className="font-bold text-white">{cert.name}</h4>
                        <p className="text-sm text-gray-400">{cert.issuer}</p>
                        {cert.issue_date && (
                          <p className="text-xs text-gray-500">
                            Issued: {new Date(cert.issue_date).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            {user.languages && user.languages.length > 0 && (
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="flex items-center gap-3">
                  <RiGlobalLine className="text-primary-100 size-8" />
                  <h2 className="text-3xl font-bold text-white">Languages</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {user.languages.map((lang, i) => (
                    <motion.div
                      key={lang.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <Badge
                        variant="outline"
                        className="border-primary-100/30 bg-primary-100/5 hover:bg-primary-100/10 px-4 py-2 text-base font-medium text-white"
                      >
                        {lang.name} • {lang.proficiency}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            {user.projects && user.projects.length > 0 && (
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="flex items-center gap-3">
                  <RiCodeLine className="text-primary-100 size-8" />
                  <h2 className="text-3xl font-bold text-white">Projects</h2>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  {user.projects.map((project, i) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      whileHover={{ y: -4 }}
                      className="group border-primary-100/20 from-primary-100/5 hover:border-primary-100/40 hover:shadow-primary-100/10 rounded-xl border bg-gradient-to-br to-transparent p-6 transition-all hover:shadow-lg"
                    >
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-white">{project.title}</h3>
                        {project.description && <p className="line-clamp-3 text-gray-400">{project.description}</p>}
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-100 hover:text-primary-200 inline-flex items-center gap-2 text-sm transition-colors"
                          >
                            <RiLinkM className="size-4" />
                            View Project
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default Page;
