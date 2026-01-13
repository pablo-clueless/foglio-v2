"use client";

import { RiNotification3Line } from "@remixicon/react";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUserStore } from "@/store/user";
import { getInitials } from "@/lib";

export const AppHeader = () => {
  const { user } = useUserStore();

  return (
    <div className="flex h-20 w-full items-center justify-between border-b px-4">
      <div className=""></div>
      <div className="flex items-center gap-x-5">
        <button>
          <RiNotification3Line className="size-4" />
        </button>
        <div className="flex items-center gap-x-2">
          <Avatar className="size-10">
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback className="text-sm font-semibold">{getInitials(user?.name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-primary-400 text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
