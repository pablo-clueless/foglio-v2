"use client";

import {
  RiArrowRightLine,
  RiBuilding2Line,
  RiCheckLine,
  RiFileSearchLine,
  RiGlobalLine,
  RiGroupLine,
  RiLineChartLine,
  RiShieldCheckLine,
  RiSparklingLine,
  RiTimeLine,
  RiUserSearchLine,
} from "@remixicon/react";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

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
    icon: RiUserSearchLine,
    title: "Smart Talent Search",
    description:
      "Find the perfect candidates with AI-powered matching that understands skills, experience, and culture fit.",
  },
  {
    icon: RiFileSearchLine,
    title: "Resume Analytics",
    description:
      "Get detailed insights from candidate resumes with automatic skill extraction and experience analysis.",
  },
  {
    icon: RiGroupLine,
    title: "Talent Pool Management",
    description: "Build and manage your own talent pools for quick access to qualified candidates when positions open.",
  },
  {
    icon: RiLineChartLine,
    title: "Hiring Analytics",
    description: "Track your recruitment metrics with comprehensive dashboards and reports.",
  },
  {
    icon: RiTimeLine,
    title: "Faster Time-to-Hire",
    description: "Reduce your hiring time by up to 50% with streamlined workflows and automated screening.",
  },
  {
    icon: RiShieldCheckLine,
    title: "Verified Profiles",
    description: "All candidates on our platform have verified credentials and work history.",
  },
];

const stats = [
  { value: "50K+", label: "Active Talents" },
  { value: "500+", label: "Companies Hiring" },
  { value: "10K+", label: "Successful Placements" },
  { value: "48hrs", label: "Avg. Response Time" },
];

const steps = [
  {
    step: "01",
    title: "Create Your Company Profile",
    description: "Set up your company profile with your brand, culture, and what makes you unique.",
  },
  {
    step: "02",
    title: "Post Your Open Positions",
    description: "Create detailed job listings with requirements, benefits, and salary ranges.",
  },
  {
    step: "03",
    title: "Discover Matching Talent",
    description: "Our AI matches your positions with qualified candidates from our talent pool.",
  },
  {
    step: "04",
    title: "Connect and Hire",
    description: "Review profiles, schedule interviews, and make offers all in one place.",
  },
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
                  <RiBuilding2Line />
                  For Recruiters
                </Badge>
              </motion.div>
              <motion.h1 className="text-4xl font-semibold sm:text-6xl" variants={itemVariants}>
                Find the <span className="text-primary-400">perfect talent</span> for your team
              </motion.h1>
              <motion.p className="max-w-2xl text-sm text-gray-400 sm:text-lg" variants={itemVariants}>
                Access a global pool of pre-vetted professionals ready to make an impact. Our AI-powered platform makes
                hiring faster, smarter, and more efficient.
              </motion.p>
              <motion.div className="flex flex-col items-center gap-4 sm:flex-row" variants={itemVariants}>
                <Button asChild size="xl">
                  <Link href="/signup">
                    Start Hiring <RiArrowRightLine className="ml-2" />
                  </Link>
                </Button>
                <Button asChild size="xl" variant="default-outline">
                  <Link href="/">View Talent Pool</Link>
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
              label="Why Choose Foglio"
              title="Powerful tools for modern recruiting"
              subtitle="Everything you need to find, evaluate, and hire top talent efficiently"
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
                title="Start hiring in 4 simple steps"
                subtitle="Get your first hire in days, not months"
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
                  <RiSparklingLine />
                  Premium Features
                </Badge>
                <h2 className="text-3xl font-semibold sm:text-4xl">Flexible plans for teams of all sizes</h2>
                <p className="text-gray-400">
                  From startups to enterprises, we have a plan that fits your hiring needs. Start free and scale as you
                  grow.
                </p>
                <ul className="space-y-3">
                  {[
                    "Unlimited job postings",
                    "AI candidate matching",
                    "Team collaboration tools",
                    "Priority support",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-x-3">
                      <RiCheckLine className="text-primary-400 size-5" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <p className="text-gray-400">Starting at</p>
                <p className="text-5xl font-bold">
                  $0<span className="text-lg text-gray-400">/month</span>
                </p>
                <p className="text-sm text-gray-400">Free forever for basic features</p>
                <Button asChild size="xl" className="w-full sm:w-auto">
                  <Link href="/signup">Get Started Free</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
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
              Join 500+ Companies
            </Badge>
            <h2 className="text-3xl font-semibold sm:text-5xl">Ready to build your dream team?</h2>
            <p className="max-w-2xl text-gray-400">
              Join hundreds of companies already using Foglio to hire top talent faster. Create your free account today
              and start connecting with qualified candidates.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Button asChild size="xl">
                <Link href="/signup">
                  Start Hiring Today <RiArrowRightLine className="ml-2" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="default-outline">
                <Link href="/help-center">Contact Sales</Link>
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
