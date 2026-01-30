"use client";

import { RiLogoutBoxRLine, RiNotification3Line, RiSearchLine, RiSettings4Line, RiUserLine } from "@remixicon/react";
import Link from "next/link";
import React from "react";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUserStore } from "@/store/user";
import { Input } from "../ui/input";
import { getInitials } from "@/lib";

interface AppHeaderProps {
  title?: string;
  showSearch?: boolean;
}

export const AppHeader = ({ title, showSearch = true }: AppHeaderProps) => {
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
        <button className="border-primary-100/15 hover:bg-primary-100/10 relative grid size-10 place-items-center rounded-lg border transition-colors">
          <RiNotification3Line className="size-5 text-gray-400" />
          <span className="bg-primary-400 absolute top-2 right-2 size-2 rounded-full"></span>
        </button>
        <Popover>
          <PopoverTrigger asChild>
            <button className="border-primary-100/15 hover:border-primary-400/50 flex h-10 items-center gap-x-3 rounded-lg border bg-black/30 p-2 transition-colors">
              <Avatar className="size-7 rounded-lg">
                <AvatarImage src={user?.image || ""} />
                <AvatarFallback className="bg-primary-400 rounded-lg text-xs font-bold text-black">
                  {getInitials(user?.name)}
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-left md:block">
                <p className="text-xs font-medium">{user?.name}</p>
                <p className="text-[10px] text-gray-500">{user?.is_recruiter ? "Recruiter" : "Job Seeker"}</p>
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="border-primary-100/15 w-64 rounded-lg border bg-black/95 p-0" align="end">
            <div className="border-primary-100/15 border-b p-4">
              <div className="flex items-center gap-x-3">
                <Avatar className="size-10 rounded-lg">
                  <AvatarImage src={user?.image || ""} />
                  <AvatarFallback className="bg-primary-400 rounded-lg text-sm font-bold text-black">
                    {getInitials(user?.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
              </div>
            </div>
            <div className="p-2">
              <Link
                href="/settings"
                className="hover:bg-primary-100/10 flex items-center gap-x-3 rounded-md px-3 py-2 text-sm text-gray-300 transition-colors"
              >
                <RiUserLine className="size-4" />
                Profile
              </Link>
              <Link
                href="/settings"
                className="hover:bg-primary-100/10 flex items-center gap-x-3 rounded-md px-3 py-2 text-sm text-gray-300 transition-colors"
              >
                <RiSettings4Line className="size-4" />
                Settings
              </Link>
            </div>
            <div className="border-primary-100/15 border-t p-2">
              <button
                onClick={() => signout()}
                className="flex w-full items-center gap-x-3 rounded-md px-3 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/10"
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
