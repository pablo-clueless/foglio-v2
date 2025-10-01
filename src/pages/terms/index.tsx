import React from "react";

import { Footer, Navbar, Seo } from "@/components/shared";

const Page = () => {
  return (
    <>
      <Seo title="Terms of Service" />
      <Navbar />
      <div className="container mx-auto space-y-10 py-10 md:space-y-20 md:py-40">
        <div className="">
          <h2 className="text-secondary-400 text-4xl font-bold">Terms of Service</h2>
          <p className=""></p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
