import { RiEdit2Line } from "@remixicon/react";
import Image from "next/image";
import React from "react";

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog";
import { cn } from "@/lib";

interface Props {
  alt: string;
  className?: string;
  src?: string;
}

export const Avatar = ({ alt, className, src }: Props) => {
  return (
    <div className={cn("border-primary-100/15 relative grid size-10 place-items-center border", className)}>
      {src ? (
        <div className="relative size-full">
          <Image alt={alt} fill sizes="100%" src={src} />
        </div>
      ) : (
        <span>{alt}</span>
      )}
      <Dialog>
        <DialogTrigger asChild>
          <button className="border-primary-100/25 absolute -right-2 -bottom-2 grid size-5 place-items-center rounded-full border bg-white">
            <RiEdit2Line className="size-3" />
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};
