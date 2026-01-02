import Image from "next/image";
import React from "react";

import { cn } from "@/lib";

interface Props {
  className?: string;
}

export const Logo = ({ className }: Props) => {
  return (
    <div className={cn("relative aspect-[2.5/1] w-16", className)}>
      <Image src="/assets/images/logo.png" alt="foglio" fill sizes="100%" />
    </div>
  );
};
