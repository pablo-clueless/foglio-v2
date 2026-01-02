"use client";

import { BellIcon } from "@phosphor-icons/react";
import React from "react";

import type { NotificationProps } from "@/types";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface Props {
  notifications: NotificationProps[];
}

export const NotificationSheet = ({}: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="grid size-8 place-items-center">
          <BellIcon className="size-5" />
        </button>
      </SheetTrigger>
      <SheetContent className="space-y-4 p-4">
        <div>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>Notifications</SheetDescription>
        </div>
        <div className="h-[calc(100%-44px)] w-full"></div>
      </SheetContent>
    </Sheet>
  );
};
