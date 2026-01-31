"use client";

import { RiLogoutBoxRLine, RiSearchLine, RiVerifiedBadgeFill, RiVipCrownFill } from "@remixicon/react";
import React from "react";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { NotificationSheet } from "./notification-sheet";
import { useUserStore } from "@/store/user";
import { Input } from "../ui/input";
import { getInitials } from "@/lib";

interface AppHeaderProps {
  title?: string;
  showSearch?: boolean;
}

export const AppHeader = ({ title, showSearch = false }: AppHeaderProps) => {
  const { user, signout } = useUserStore();
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <div className="border-primary-100/15 flex h-16 w-full items-center justify-between border-b bg-black/20 px-6">
      <div className="flex items-center gap-x-6">
        {title && <h1 className="text-lg font-semibold">{title}</h1>}
        {showSearch && (
          <div className="relative hidden md:block">
            <RiSearchLine className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-primary-100/15 w-64 bg-black/30 pl-10 text-sm"
            />
          </div>
        )}
      </div>
      <div className="flex items-center gap-x-3">
        <NotificationSheet />
        <Popover>
          <PopoverTrigger asChild>
            <button className="border-primary-100/15 hover:border-primary-400/50 flex h-10 items-center gap-x-3 border bg-black/30 p-2 transition-colors">
              <Avatar className="size-7">
                <AvatarImage src={user?.image || ""} />
                <AvatarFallback className="bg-primary-400 text-xs font-bold text-black">
                  {getInitials(user?.name)}
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-left md:block">
                <p className="flex items-center gap-x-1 text-xs font-medium">
                  {user?.name}
                  {user?.verified && <RiVerifiedBadgeFill className="size-3 text-green-500" />}
                  {user?.is_premium && <RiVipCrownFill className="size-3 text-yellow-500" />}
                </p>
                <p className="text-[10px] text-gray-500">{user?.is_recruiter ? "Recruiter" : "Job Seeker"}</p>
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="border-primary-100/15 w-64 border bg-black p-0" align="end">
            <div className="border-primary-100/15 border-b p-4">
              <div className="flex items-center gap-x-3">
                <Avatar className="size-10">
                  <AvatarImage src={user?.image || ""} />
                  <AvatarFallback className="bg-primary-400 text-sm font-bold text-black">
                    {getInitials(user?.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="flex items-center gap-x-1 font-medium">
                    {user?.name}
                    {user?.verified && <RiVerifiedBadgeFill className="size-4 text-green-500" />}
                    {user?.is_premium && <RiVipCrownFill className="size-4 text-yellow-500" />}
                  </p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
              </div>
            </div>
            <div className="border-primary-100/15 border-t p-2">
              <button
                onClick={() => signout()}
                className="flex w-full items-center gap-x-3 px-3 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/10"
              >
                <RiLogoutBoxRLine className="size-4" />
                Sign Out
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
