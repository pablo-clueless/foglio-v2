import Image from "next/image";
import React from "react";

import { cn } from "@/lib";

interface Props {
  className?: string;
  mode?: "dark" | "light";
}

export const Logo = ({ className, mode = "dark" }: Props) => {
  const image = mode === "dark" ? "/assets/images/logo-dark.png" : "/assets/images/logo.png";

  return (
    <div className={cn("relative aspect-[3/1] w-20", className)}>
      <Image src={image} alt="foglio" fill sizes="100%" />
    </div>
  );
};
