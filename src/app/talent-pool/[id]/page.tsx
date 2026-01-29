"use client";

import { useParams } from "next/navigation";
import React from "react";

import { useGetUserQuery } from "@/api/user";
import { Navbar } from "@/components/shared";

const Page = () => {
  const id = useParams().id as string;

  const {} = useGetUserQuery(id, { refetchOnFocus: true, refetchOnMountOrArgChange: true, skip: !id });

  return (
    <>
      <Navbar />
      <div className="w-screen overflow-hidden">
        <section className="bg-grid-1 min-h-[90vh] w-full bg-black/85 bg-cover bg-no-repeat bg-blend-overlay">
          <div className="container mx-auto grid h-full max-w-6xl place-items-center px-4 py-20 sm:py-32"></div>
        </section>
      </div>
    </>
  );
};

export default Page;
