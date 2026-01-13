"use client";

import { RiArrowRightLine, RiSparklingLine } from "@remixicon/react";
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
              <div className="flex max-w-4xl flex-col items-center space-y-5 text-center sm:space-y-10">
                <Badge>
                  <RiSparklingLine /> Get Ahead
                </Badge>
                <p className="text-3xl font-semibold sm:text-6xl">
                  Create your <span className="text-primary-400">resume</span> and{" "}
                  <span className="text-primary-400">portfolio</span> in one place. In minutes.
                </p>
                <p className="text-sm text-gray-500 sm:text-base">
                  Change the way you approach your job search. Move a step closer to your dream job.
                </p>
                <div className="flex items-center gap-4">
                  <Button asChild size="xl">
                    <Link href="/signup">Get Started</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container mx-auto max-w-6xl space-y-10 py-10 sm:space-y-20 sm:py-20">
          <SectionHeader
            label="why foglio?"
            subtitle="Foglio makes building a resume easier than ever. And you have a portfolio and resume all in one place"
            title="Features"
          />
          <div className="border-primary-100/15 grid grid-cols-1 border">
            {FEATURES.map((feature, index) => {
              const isReversed = index % 2 === 0;
              return (
                <div
                  className={cn(
                    "border-primary-100/15 group flex flex-col border-b last:border-b-0 sm:flex-row",
                    isReversed && "sm:flex-row-reverse",
                  )}
                  key={index}
                >
                  <div className="flex flex-1 flex-col justify-center gap-y-2 p-10">
                    <feature.icon className="text-primary-400 size-5" />
                    <p className="text-xl sm:text-4xl">{feature.title}</p>
                    <p className="text-xs text-gray-500 sm:text-sm">{feature.subtitle}</p>
                  </div>
                  <div className={cn("border-primary-100/15 flex-1 p-10", isReversed ? "border-r" : "border-l")}>
                    <div className="relative aspect-square rounded-md">
                      <Image
                        alt={feature.title}
                        className="grayscale-100 transition-all duration-500 group-hover:grayscale-0"
                        fill
                        sizes="100%"
                        src={feature.image}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <section className="container mx-auto max-w-6xl space-y-10 py-10 sm:space-y-20 sm:py-20">
          <div className="flex w-full items-center justify-between">
            <SectionHeader
              label="testimonials"
              subtitle="See what our users are saying about Foglio"
              title="Loved by job seekers"
            />
            <div className="flex items-center gap-x-4">
              <button
                className="bg-primary-400 hover:bg-primary-400/90 grid aspect-square w-5 place-items-center rounded-md sm:w-10"
                onClick={handlePrevious}
              >
                <RiArrowRightLine className="rotate-180 text-black" />
              </button>
              <button
                className="bg-primary-400 hover:bg-primary-400/90 grid aspect-square w-5 place-items-center rounded-md sm:w-10"
                onClick={handleNext}
              >
                <RiArrowRightLine className="text-black" />
              </button>
            </div>
          </div>
          <div className="flex w-full items-center overflow-x-hidden">
            <div
              className="flex aspect-[5/2] w-full shrink-0 transition-transform duration-300"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {MOCK_REVIEWS.map((review) => (
                <Card key={review.id} review={review} />
              ))}
            </div>
          </div>
        </section>
        <section className="container mx-auto max-w-6xl space-y-10 py-10 sm:space-y-20 sm:py-20">
          <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
            <SectionHeader
              label="how it works"
              subtitle="Watch your profile transform into a polished, job-ready CV in three simple steps"
              title="From chaos to career"
            />
            <div className="grid w-full grid-cols-1 gap-5 px-10 sm:grid-cols-2 sm:px-0">
              {HOW_IT_WORKS.map((item, index) => (
                <div className="border-primary-100/15 space-y-4 border p-3 sm:space-y-8" key={index}>
                  <div className="relative size-7 opacity-50 sm:size-14">
                    <Image src={item.image} alt={item.title} fill sizes="100%" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-primary-400 text-base font-semibold sm:text-xl">{item.title}</p>
                    <p className="text-xs text-gray-400 sm:text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="container mx-auto flex max-w-4xl flex-col items-center space-y-10 py-10 sm:py-20">
          <SectionHeader
            label="frequently asked questions"
            title="Your questions, answered"
            subtitle="Clear, concise guidance to help you craft a standout CV with confidence."
          />
          <Accordion className="w-full px-10 sm:px-0" type="single">
            {FREQUENTLY_ASKED_QUESTIONS.map((item, index) => {
              const ordinal = index + 1;
              return (
                <AccordionItem className="space-y-3 p-3" key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-gray-400">
                    {ordinal}. {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="p-3 text-base">{item.answer}</AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </section>
        <section className="bg-grid-2 h-[250px] bg-black/25 bg-cover bg-center bg-no-repeat py-10 bg-blend-overlay sm:h-[500px] sm:py-20">
          <div className="container mx-auto max-w-6xl p-4"></div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Page;
