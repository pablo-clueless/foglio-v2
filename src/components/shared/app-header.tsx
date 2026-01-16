"use client";

import { RiNotification3Line } from "@remixicon/react";
import React from "react";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUserStore } from "@/store/user";
import { getInitials } from "@/lib";

export const AppHeader = () => {
  const { user } = useUserStore();

  return (
    <div className="border-primary-100/15 flex h-14 w-full items-center justify-between border-b px-4">
      <div className=""></div>
      <div className="flex items-center gap-x-5">
        <button className="border-primary-100/15 grid size-8 place-items-center border">
          <RiNotification3Line className="text-primary-400 size-4" />
        </button>
        <Popover>
          <PopoverTrigger asChild>
            <Avatar className="size-8 rounded-none">
              <AvatarImage src={user?.image || ""} />
              <AvatarFallback className="rounded-none text-xs font-bold">{getInitials(user?.name)}</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="border-primary-100/15 mr-4 space-y-4 rounded-none border bg-black">
            <div className="flex items-center gap-x-2">
              <Avatar className="size-8 rounded-none">
                <AvatarImage src={user?.image || ""} />
                <AvatarFallback className="rounded-none text-xs font-bold">{getInitials(user?.name)}</AvatarFallback>
              </Avatar>
              <div className="">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs font-semibold text-gray-400">{user?.email}</p>
              </div>
            </div>
            <div className="w-full space-y-4">
              <hr className="border-primary-100/15" />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
