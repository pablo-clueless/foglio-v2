"use client";

import Image from "next/image";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="grid h-screen w-screen grid-cols-1 bg-black lg:grid-cols-2">
      <div className="hidden h-full place-items-center py-10 lg:grid">
        <div className="bg-primary-400 relative aspect-[4/5] h-full">
          <Image
            alt="auth-image"
            className="object-cover object-center"
            fill
            sizes="100%"
            src={
              "https://images.unsplash.com/photo-1531739055420-dd1c1852124e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJ1aWxkfGVufDB8MXwwfHx8Mg%3D%3D"
            }
          />
        </div>
      </div>
      <div className="h-full p-1">
        <div className="grid size-full place-items-center">{children}</div>
      </div>
    </div>
  );
}
