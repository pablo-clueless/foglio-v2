import React from "react";

import { useRouteChangeLoader } from "@/hooks";

export const Loader = () => {
  return (
    <div className="!z-50 grid h-screen w-screen place-items-center">
      <div className="relative grid size-52 animate-spin place-items-center rounded-full duration-1000">
        <div className="bg-primary-400 animate-follow absolute top-0 left-0 size-5 rounded-full duration-1000"></div>
        <div className="bg-primary-400 size-10 rounded-full"></div>
      </div>
    </div>
  );
};

export const GlobalLoader = () => {
  const loading = useRouteChangeLoader();
  return loading ? <Loader /> : null;
};
