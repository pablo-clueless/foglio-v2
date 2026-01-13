"use client";

import { RiGlobalLine } from "@remixicon/react";
import React from "react";

import { Footer, Navbar } from "@/components/shared";
import { Badge } from "@/components/ui/badge";

const Page = () => {
  return (
    <>
      <Navbar />
      <div className="w-screen overflow-hidden">
        <section className="container mx-auto max-w-6xl space-y-2 py-10 sm:py-28">
          <Badge>
            <RiGlobalLine />
            Global Talents
          </Badge>
          <h1 className="text-4xl font-semibold sm:text-6xl">For Talents</h1>
          <p className="text-sm text-gray-400 sm:text-base">Get connected to organizations that best suite you</p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Page;
