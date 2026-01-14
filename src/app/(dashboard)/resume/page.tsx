"use client";

import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExportResume } from "@/components/modules/resume";
import { ScrollArea } from "@/components/shared";
import { useUserStore } from "@/store/user";
import { getInitials } from "@/lib";

const Page = () => {
  const { user } = useUserStore();

  if (!user) {
    return <div className="grid h-full w-full place-items-center"></div>;
  }

  return (
    <ScrollArea>
      <div className="w-full space-y-4 text-black">
        <div className="flex items-center justify-end">
          <ExportResume />
        </div>
        <div className="bg-primary-100/25 flex items-center gap-x-5 rounded-xl p-4">
          <Avatar className="size-20">
            <AvatarImage src={user.image} />
            <AvatarFallback className="text-4xl font-bold">{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-3xl font-semibold">{user.name}</p>
            <div className="flex items-center gap-x-3 text-gray-400">
              <p className="text-sm">{user.email}</p>
            </div>
          </div>
        </div>
        <div className="w-full"></div>
      </div>
    </ScrollArea>
  );
};

export default Page;
