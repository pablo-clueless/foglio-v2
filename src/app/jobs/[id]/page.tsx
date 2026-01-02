"use client";

import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const id = useParams().id as string;

  return (
    <div className="w-screen overflow-hidden">
      <div className="container mx-auto max-w-6xl">{id}</div>
    </div>
  );
};

export default Page;
