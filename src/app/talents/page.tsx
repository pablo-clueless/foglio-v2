"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import {
  RiArrowRightLine,
  RiBriefcase4Line,
  RiCheckLine,
  RiFileTextLine,
  RiGlobalLine,
  RiHeartLine,
  RiLightbulbLine,
  RiLineChartLine,
  RiMagicLine,
  RiNotification3Line,
  RiRocketLine,
  RiSearchEyeLine,
  RiShieldCheckLine,
  RiUserLine,
} from "@remixicon/react";

import { Footer, Navbar, SectionHeader } from "@/components/shared";
import { Button } from "@/components/ui/button";
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

const features = [
  {
    icon: RiMagicLine,
    title: "AI Resume Builder",
    description:
      "Create stunning, ATS-friendly resumes in minutes with our AI-powered builder and professional templates.",
  },
  {
    icon: RiSearchEyeLine,
    title: "Get Discovered",
    description: "Let recruiters find you. Your profile is visible to hundreds of companies actively looking to hire.",
  },
  {
    icon: RiNotification3Line,
    title: "Job Alerts",
    description: "Get notified instantly when jobs matching your skills and preferences are posted.",
  },
  {
    icon: RiLineChartLine,
    title: "Track Applications",
    description: "Keep track of all your job applications, interviews, and offers in one organized dashboard.",
  },
  {
    icon: RiLightbulbLine,
    title: "Career Insights",
    description: "Get personalized recommendations on skills to learn and roles that match your experience.",
  },
  {
    icon: RiShieldCheckLine,
    title: "Verified Badge",
    description: "Verify your skills and experience to stand out from other candidates and build trust.",
  },
];

const stats = [
  { value: "100K+", label: "Jobs Posted" },
  { value: "500+", label: "Companies Hiring" },
  { value: "85%", label: "Success Rate" },
  { value: "Free", label: "Forever" },
];

const steps = [
  {
    step: "01",
    title: "Create Your Profile",
    description: "Sign up and build your professional profile with your skills, experience, and preferences.",
  },
  {
    step: "02",
    title: "Build Your Resume",
    description: "Use our AI-powered builder to create a stunning resume that gets noticed.",
  },
  {
    step: "03",
    title: "Get Matched",
    description: "Our algorithm matches you with jobs that fit your skills and career goals.",
  },
  {
    step: "04",
    title: "Land Your Dream Job",
    description: "Apply with one click and track your progress until you get that offer.",
  },
];

const benefits = [
  "100% free to use",
  "No hidden fees or premium locks",
  "Unlimited job applications",
  "Professional resume templates",
  "AI-powered job matching",
  "Direct recruiter connections",
];

const Page = () => {
  return (
    <>
      <Navbar />
      <div className="w-screen overflow-hidden">
        <section className="bg-grid-1 min-h-[90vh] w-full bg-black/85 bg-cover bg-no-repeat bg-blend-overlay">
          <div className="container mx-auto grid h-full max-w-6xl place-items-center px-4 py-20 sm:py-32">
            <motion.div
              className="flex max-w-4xl flex-col items-center space-y-6 text-center sm:space-y-10"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <Badge>
                  <RiUserLine />
                  For Job Seekers
                </Badge>
              </motion.div>
              <motion.h1 className="text-4xl font-semibold sm:text-6xl" variants={itemVariants}>
                Land your <span className="text-primary-400">dream job</span> with confidence
              </motion.h1>
              <motion.p className="max-w-2xl text-sm text-gray-400 sm:text-lg" variants={itemVariants}>
                Create a standout resume, get discovered by top companies, and take control of your career journey. All
                the tools you need to succeed, completely free.
              </motion.p>
              <motion.div className="flex flex-col items-center gap-4 sm:flex-row" variants={itemVariants}>
                <Button asChild size="xl">
                  <Link href="/signup">
                    Create Free Account <RiArrowRightLine className="ml-2" />
                  </Link>
                </Button>
                <Button asChild size="xl" variant="default-outline">
                  <Link href="/jobs">Browse Jobs</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
        <section className="border-primary-100/15 border-y bg-black/30">
          <div className="container mx-auto max-w-6xl px-4 py-12">
            <motion.div
              className="grid grid-cols-2 gap-8 md:grid-cols-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              {stats.map((stat, index) => (
                <motion.div key={index} className="text-center" variants={itemVariants}>
                  <p className="text-primary-400 text-3xl font-bold sm:text-4xl">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        <section className="container mx-auto max-w-6xl space-y-12 px-4 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader
              label="Everything You Need"
              title="Tools to accelerate your job search"
              subtitle="From resume building to application tracking, we've got you covered"
            />
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="border-primary-100/15 hover:border-primary-400/30 group space-y-4 rounded-lg border bg-black/20 p-6 transition-all duration-300 hover:bg-black/40"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-primary-400/10 group-hover:bg-primary-400/20 inline-flex rounded-lg p-3 transition-colors">
                  <feature.icon className="text-primary-400 size-6" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
        <section className="border-primary-100/15 border-y bg-black/20">
          <div className="container mx-auto max-w-6xl space-y-12 px-4 py-16 sm:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <SectionHeader
                label="How It Works"
                title="Your path to the perfect job"
                subtitle="Four simple steps to kickstart your career"
              />
            </motion.div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="relative space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <span className="text-primary-400/30 text-5xl font-bold">{step.step}</span>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="text-sm text-gray-400">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section className="container mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge>
                <RiFileTextLine />
                Resume Builder
              </Badge>
              <h2 className="text-3xl font-semibold sm:text-4xl">
                Create a resume that <span className="text-primary-400">stands out</span>
              </h2>
              <p className="text-gray-400">
                Our AI-powered resume builder helps you create professional, ATS-optimized resumes that catch
                recruiters&apos; attention. Choose from multiple templates and customize every detail to showcase your
                unique strengths.
              </p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {[
                  "8+ Professional templates",
                  "ATS-friendly formats",
                  "AI content suggestions",
                  "One-click export to PDF",
                  "Multiple font options",
                  "Real-time preview",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-x-3">
                    <RiCheckLine className="text-primary-400 size-5 shrink-0" />
                    <span className="text-sm text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg">
                <Link href="/signup">
                  Build Your Resume <RiArrowRightLine className="ml-2" />
                </Link>
              </Button>
            </motion.div>
            <motion.div
              className="border-primary-100/15 relative aspect-[4/3] overflow-hidden rounded-lg border bg-black/30"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="space-y-4 text-center">
                  <RiFileTextLine className="text-primary-400/50 mx-auto size-20" />
                  <p className="text-gray-500">Resume Preview</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        <section className="border-primary-100/15 border-y bg-black/20">
          <div className="container mx-auto max-w-6xl px-4 py-16 sm:py-24">
            <motion.div
              className="border-primary-100/15 rounded-2xl border bg-gradient-to-br from-black/40 to-black/20 p-8 sm:p-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <div className="space-y-6">
                  <Badge>
                    <RiHeartLine />
                    Free Forever
                  </Badge>
                  <h2 className="text-3xl font-semibold sm:text-4xl">Everything you need, completely free</h2>
                  <p className="text-gray-400">
                    We believe everyone deserves access to great career tools. That&apos;s why Foglio is free for job
                    seekers, with no hidden fees or premium paywalls.
                  </p>
                  <ul className="space-y-3">
                    {benefits.map((item, index) => (
                      <li key={index} className="flex items-center gap-x-3">
                        <RiCheckLine className="text-primary-400 size-5" />
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col items-center justify-center space-y-6 text-center">
                  <div className="bg-primary-400/10 rounded-full p-6">
                    <RiRocketLine className="text-primary-400 size-16" />
                  </div>
                  <p className="text-2xl font-semibold">Ready to launch your career?</p>
                  <Button asChild size="xl" className="w-full sm:w-auto">
                    <Link href="/signup">Get Started Now</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        <motion.section
          className="bg-grid-2 bg-black/50 bg-cover bg-center bg-no-repeat py-16 bg-blend-overlay sm:py-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto flex max-w-4xl flex-col items-center gap-y-6 px-4 text-center sm:gap-y-8">
            <Badge>
              <RiGlobalLine />
              Join 50K+ Job Seekers
            </Badge>
            <h2 className="text-3xl font-semibold sm:text-5xl">Your next opportunity is waiting</h2>
            <p className="max-w-2xl text-gray-400">
              Thousands of professionals have already found their dream jobs through Foglio. Create your free account
              today and take the first step toward your future.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Button asChild size="xl">
                <Link href="/signup">
                  Create Free Account <RiArrowRightLine className="ml-2" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="default-outline">
                <Link href="/jobs">
                  <RiBriefcase4Line className="mr-2" />
                  Explore Jobs
                </Link>
              </Button>
            </div>
          </div>
        </motion.section>
      </div>
      <Footer />
    </>
  );
};

export default Page;
