"use client";

import { RiQuestionLine } from "@remixicon/react";
import React from "react";

import { Footer, Navbar } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks";

const Page = () => {
  const [search, setSearch] = React.useState("");
  useDebounce(search, 500);

  return (
    <>
      <Navbar />
      <div className="w-screen overflow-hidden">
        <section className="container mx-auto max-w-6xl space-y-6 py-10 sm:py-28">
          <div className="w-full space-y-4">
            <Badge>
              <RiQuestionLine />
              Get Help
            </Badge>
            <h1 className="text-4xl font-semibold sm:text-6xl">Help Center</h1>
            <p className="text-sm text-gray-400 sm:text-base">Get access to the best talents accross the globe</p>
          </div>
          <Input onChange={(e) => setSearch(e.target.value)} type="search" value={search} wrapperClassName="w-1/2" />
        </section>
        <section className="container mx-auto max-w-6xl space-y-2 py-10 sm:py-28">
          <div className=""></div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Page;
