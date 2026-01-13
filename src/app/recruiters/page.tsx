"use client";

import { RiBuilding2Line } from "@remixicon/react";
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
            <RiBuilding2Line />
            Top Recruiters
          </Badge>
          <h1 className="text-4xl font-semibold sm:text-6xl">For Recruiters</h1>
          <p className="text-sm text-gray-400 sm:text-base">Get access to the best talents accross the globe</p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Page;
