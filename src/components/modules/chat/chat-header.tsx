"use client";

import { RiMore2Fill, RiPhoneLine, RiVideoOnLine, RiUserLine, RiDeleteBinLine } from "@remixicon/react";
import Link from "next/link";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import type { UserSummary } from "@/types";
import { getInitials } from "@/lib";

interface ChatHeaderProps {
  user: UserSummary;
  isOnline?: boolean;
  isTyping?: boolean;
  onDeleteConversation?: () => void;
}

export const ChatHeader = ({ user, isOnline, isTyping, onDeleteConversation }: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between border-b border-white/10 bg-black/20 px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="size-10">
            <AvatarImage src={user.image} />
            <AvatarFallback className="bg-primary-400 text-sm font-bold text-black">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          {isOnline && (
            <span className="absolute right-0 bottom-0 size-3 rounded-full border-2 border-black bg-green-500" />
          )}
        </div>
        <div>
          <h3 className="font-medium text-white">{user.name}</h3>
          <p className="text-xs text-gray-400">
            {isTyping ? <span className="text-primary-400">typing...</span> : isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white" disabled>
          <RiPhoneLine className="size-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white" disabled>
          <RiVideoOnLine className="size-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <RiMore2Fill className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="border-white/10 bg-black">
            <DropdownMenuItem asChild>
              <Link href={`/talent-pool/${user.id}`} className="flex items-center gap-2">
                <RiUserLine className="size-4" />
                View Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem
              onClick={onDeleteConversation}
              className="flex items-center gap-2 text-red-400 focus:text-red-400"
            >
              <RiDeleteBinLine className="size-4" />
              Delete Conversation
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
