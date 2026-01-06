"use client";

import { RiSparklingLine } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FEATURES, FREQUENTLY_ASKED_QUESTIONS, HOW_IT_WORKS } from "@/constants/data";
import { Footer, Navbar, SectionHeader } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib";

const Page = () => {
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
                <p className="text-4xl font-bold sm:text-8xl">
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
                    "border-primary-100/15 flex flex-col border-b last:border-b-0 sm:flex-row",
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
                      <Image src={feature.image} alt={feature.title} fill sizes="100%" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <section className="container mx-auto max-w-6xl space-y-10 py-10 sm:space-y-20 sm:py-20">
          <SectionHeader
            label="how it works"
            subtitle="Watch your profile transform into a polished, job-ready CV in three simple steps"
            title="From chaos to career"
          />
          <div className="grid w-full grid-cols-1 gap-5 px-10 sm:grid-cols-2 sm:px-0">
            {HOW_IT_WORKS.map((item, index) => (
              <div className="border-primary-100/15 relative space-y-10 border p-3 sm:space-y-20" key={index}>
                <div className="absolute top-4 right-4 size-10 opacity-50 sm:size-28">
                  <Image src={item.image} alt={item.title} fill sizes="100%" />
                </div>
                <p className="text-primary-400 text-xs sm:text-sm">{item.step}</p>
                <div className="space-y-1">
                  <p className="text-primary-400 text-xl font-semibold sm:text-2xl">{item.title}</p>
                  <p className="text-xs text-gray-400 sm:text-sm">{item.description}</p>
                </div>
              </div>
            ))}
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
        <section className="bg-primary-400/25 bg-grid-2 h-[250px] bg-cover bg-center bg-no-repeat py-10 bg-blend-overlay sm:h-[500px] sm:py-20">
          <div className="container mx-auto max-w-6xl p-4"></div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Page;
