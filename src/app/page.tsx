"use client";

import { RiArrowRightLine, RiSparklingLine } from "@remixicon/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FEATURES, FREQUENTLY_ASKED_QUESTIONS, HOW_IT_WORKS } from "@/constants/data";
import { Footer, Navbar, SectionHeader } from "@/components/shared";
import { Card } from "@/components/modules/review";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib";

import { MOCK_REVIEWS } from "@/__mock__";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
} as const;

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
} as const;

const slideInFromLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
} as const;

const slideInFromRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
} as const;

const Page = () => {
  const [current, setCurrent] = React.useState(0);

  const handleNext = () => {
    setCurrent((current) => (current + 1) % MOCK_REVIEWS.length);
  };

  const handlePrevious = () => {
    setCurrent((current) => (current - 1 + MOCK_REVIEWS.length) % MOCK_REVIEWS.length);
  };

  return (
    <>
      <Navbar />
      <div className="w-screen overflow-hidden">
        <section className="bg-grid-1 h-screen w-full bg-black/85 bg-cover bg-no-repeat bg-blend-overlay">
          <div className="container mx-auto grid h-full max-w-6xl place-items-center py-10 bg-blend-overlay sm:py-20">
            <div className="grid w-full place-items-center">
              <motion.div
                className="flex max-w-4xl flex-col items-center space-y-5 text-center sm:space-y-10"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={fadeInUp}>
                  <Badge>
                    <RiSparklingLine /> Get Ahead
                  </Badge>
                </motion.div>
                <motion.p className="text-3xl font-medium sm:text-6xl" variants={fadeInUp}>
                  Create your <span className="text-primary-400">resume</span> and{" "}
                  <span className="text-primary-400">portfolio</span> in one place. In minutes.
                </motion.p>
                <motion.p className="text-sm text-gray-500 sm:text-base" variants={fadeInUp}>
                  Change the way you approach your job search. Move a step closer to your dream job.
                </motion.p>
                <motion.div className="flex items-center gap-4" variants={scaleIn}>
                  <Button asChild size="xl">
                    <Link href="/signup">Get Started</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
        <section className="container mx-auto max-w-6xl space-y-10 py-10 sm:space-y-20 sm:py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <SectionHeader
              label="why foglio?"
              subtitle="Foglio makes building a resume easier than ever. And you have a portfolio and resume all in one place"
              title="Features"
            />
          </motion.div>
          <div className="border-primary-100/15 grid grid-cols-1 border">
            {FEATURES.map((feature, index) => {
              const isReversed = index % 2 === 0;
              return (
                <motion.div
                  className={cn(
                    "border-primary-100/15 group flex flex-col border-b last:border-b-0 sm:flex-row",
                    isReversed && "sm:flex-row-reverse",
                  )}
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={isReversed ? slideInFromRight : slideInFromLeft}
                >
                  <div className="flex flex-1 flex-col justify-center gap-y-2 p-10">
                    <feature.icon className="text-primary-400 size-5" />
                    <p className="text-xl sm:text-4xl">{feature.title}</p>
                    <p className="text-xs text-gray-500 sm:text-sm">{feature.subtitle}</p>
                  </div>
                  <div className={cn("border-primary-100/15 flex-1 p-10", isReversed ? "border-r" : "border-l")}>
                    <motion.div
                      className="relative aspect-square rounded-md"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        alt={feature.title}
                        className="grayscale-100 transition-all duration-500 group-hover:grayscale-0"
                        fill
                        sizes="100%"
                        src={feature.image}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
        <section className="container mx-auto max-w-6xl space-y-10 py-10 sm:space-y-20 sm:py-20">
          <motion.div
            className="flex w-full items-center justify-between"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <SectionHeader
              label="testimonials"
              subtitle="See what our users are saying about Foglio"
              title="Loved by job seekers"
            />
            <div className="flex items-center gap-x-4">
              <motion.button
                className="bg-primary-400 hover:bg-primary-400/90 grid aspect-square w-5 place-items-center rounded-md sm:w-10"
                onClick={handlePrevious}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <RiArrowRightLine className="rotate-180 text-black" />
              </motion.button>
              <motion.button
                className="bg-primary-400 hover:bg-primary-400/90 grid aspect-square w-5 place-items-center rounded-md sm:w-10"
                onClick={handleNext}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <RiArrowRightLine className="text-black" />
              </motion.button>
            </div>
          </motion.div>
          <motion.div
            className="flex w-full items-center overflow-x-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="flex aspect-[5/2] w-full shrink-0"
              animate={{ x: `-${current * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {MOCK_REVIEWS.map((review) => (
                <Card key={review.id} review={review} />
              ))}
            </motion.div>
          </motion.div>
        </section>
        <section className="container mx-auto max-w-6xl space-y-10 py-10 sm:space-y-20 sm:py-20">
          <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideInFromLeft}
            >
              <SectionHeader
                label="how it works"
                subtitle="Watch your profile transform into a polished, job-ready CV in three simple steps"
                title="From chaos to career"
              />
            </motion.div>
            <div className="grid w-full grid-cols-1 gap-5 px-10 sm:grid-cols-2 sm:px-0">
              {HOW_IT_WORKS.map((item, index) => (
                <motion.div
                  className="border-primary-100/15 space-y-4 border p-3 sm:space-y-8"
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.2)" }}
                >
                  <div className="relative size-7 opacity-50 sm:size-14">
                    <Image src={item.image} alt={item.title} fill sizes="100%" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-primary-400 text-base font-semibold sm:text-xl">{item.title}</p>
                    <p className="text-xs text-gray-400 sm:text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section className="container mx-auto flex max-w-4xl flex-col items-center space-y-10 py-10 sm:py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <SectionHeader
              label="frequently asked questions"
              title="Your questions, answered"
              subtitle="Clear, concise guidance to help you craft a standout CV with confidence."
            />
          </motion.div>
          <Accordion className="w-full px-10 sm:px-0" type="single">
            {FREQUENTLY_ASKED_QUESTIONS.map((item, index) => {
              const ordinal = index + 1;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <AccordionItem className="space-y-3 p-3" value={`item-${index}`}>
                    <AccordionTrigger className="text-gray-400">
                      {ordinal}. {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="p-3 text-base">{item.answer}</AccordionContent>
                  </AccordionItem>
                </motion.div>
              );
            })}
          </Accordion>
        </section>
        <motion.section
          className="bg-grid-2 bg-black/50 bg-cover bg-center bg-no-repeat py-16 bg-blend-overlay sm:py-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto flex max-w-4xl flex-col items-center gap-y-6 p-4 text-center sm:gap-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Badge>
                <RiSparklingLine /> Start Today
              </Badge>
            </motion.div>
            <motion.h2
              className="text-3xl font-medium sm:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Ready to land your dream job?
            </motion.h2>
            <motion.p
              className="max-w-2xl text-sm text-gray-400 sm:text-base"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Join thousands of professionals who have transformed their job search with Foglio. Create your stunning
              resume and portfolio in minutes.
            </motion.p>
            <motion.div
              className="flex flex-col items-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button asChild size="xl">
                <Link href="/signup">
                  Get Started for Free <RiArrowRightLine className="ml-2" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="default-outline">
                <Link href="/jobs">Browse Jobs</Link>
              </Button>
            </motion.div>
          </div>
        </motion.section>
      </div>
      <Footer />
    </>
  );
};

export default Page;
