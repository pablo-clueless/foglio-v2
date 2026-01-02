"use client";

import React from "react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Footer, Navbar } from "@/components/shared";
import { FEATURES, FREQUENTLY_ASKED_QUESTIONS, HOW_IT_WORKS } from "@/constants/data";

console.log({ FEATURES, HOW_IT_WORKS });

const Page = () => {
  return (
    <>
      <Navbar />
      <div className="w-screen overflow-hidden">
        <section className="container mx-auto min-h-screen max-w-6xl py-10 sm:py-20"></section>
        <section className="container mx-auto max-w-6xl py-10 sm:py-20"></section>
        <section className="container mx-auto max-w-6xl py-10 sm:py-20"></section>
        <section className="container mx-auto max-w-6xl space-y-10 py-10 sm:py-20">
          <div className=""></div>
          <Accordion single>
            {FREQUENTLY_ASKED_QUESTIONS.map((item, index) => (
              <AccordionItem id={`item-${index}`} key={index}>
                <AccordionTrigger id={`item-${index}`}>{item.question}</AccordionTrigger>
                <AccordionContent id={`item-${index}`}>
                  <div className="py-5">{item.answer}</div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
        <section className="w-full bg-white">
          <div className="container mx-auto w-full max-w-6xl py-10 sm:py-20"></div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Page;
