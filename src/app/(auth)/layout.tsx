"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="bg-primary-400 grid h-screen w-screen grid-cols-1 sm:grid-cols-11">
      <div className="col-span-5 h-full"></div>
      <div className="col-span-6 h-full p-1">
        <div className="grid size-full place-items-center rounded-xl bg-black">{children}</div>
      </div>
    </div>
  );
}
