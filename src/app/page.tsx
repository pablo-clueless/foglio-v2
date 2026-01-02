import React from "react";

import { Footer, Navbar } from "@/components/shared";

const Page = () => {
  return (
    <>
      <Navbar />
      <div className="w-screen overflow-hidden">
        <section className="container mx-auto min-h-screen max-w-6xl py-10 sm:py-20"></section>
        <section className="w-full bg-white">
          <div className="container mx-auto w-full max-w-6xl py-10 sm:py-20"></div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Page;
