"use client";

import Link from "next/link";
import React from "react";

import { Avatar, ScrollArea } from "@/components/shared";
import { Button } from "@/components/ui/button";
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
          <Button asChild size="sm">
            <Link href="/resume/export">Export Resume</Link>
          </Button>
        </div>
        <div className="bg-primary-100/25 flex items-center gap-x-5 p-4">
          <Avatar
            alt={getInitials(user.name)}
            className="bg-primary-400 size-20 text-4xl font-bold text-black"
            src={user.image}
          />
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
