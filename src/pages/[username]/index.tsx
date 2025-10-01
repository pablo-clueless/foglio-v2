import { useRouter } from "next/router";
import React from "react";

import { Seo } from "@/components/shared";

const Page = () => {
  const router = useRouter();
  const username = router.query;

  return (
    <>
      <Seo title="" />
      <div className=""></div>
    </>
  );
};

export default Page;
