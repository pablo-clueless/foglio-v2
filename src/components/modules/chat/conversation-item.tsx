"use client";

import { formatDistanceToNow } from "date-fns";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { ConversationResponse } from "@/types";
import { getInitials, cn } from "@/lib";

interface ConversationItemProps {
  conversation: ConversationResponse;
  isActive: boolean;
  isTyping?: boolean;
  onClick: () => void;
}

export const ConversationItem = ({ conversation, isActive, isTyping, onClick }: ConversationItemProps) => {
  const { other_user, last_message, unread_count, updated_at } = conversation;

  const timeAgo = formatDistanceToNow(new Date(last_message?.created_at || updated_at), { addSuffix: true });

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 px-4 py-2 text-left transition-colors",
        isActive
          ? "bg-primary-400/10 border-l-primary-400 border-l-2"
          : "border-l-2 border-l-transparent hover:bg-white/5",
      )}
    >
      <div className="relative">
        <Avatar className="size-8">
          <AvatarImage src={other_user.image} />
          <AvatarFallback className="bg-primary-400 text-sm font-bold text-black">
            {getInitials(other_user.name)}
          </AvatarFallback>
        </Avatar>
        {unread_count > 0 && (
          <span className="bg-primary-400 absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full text-xs font-bold text-black">
            {unread_count > 9 ? "9+" : unread_count}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <h4 className={cn("truncate text-sm font-medium", unread_count > 0 ? "text-white" : "text-gray-300")}>
            {other_user.name}
          </h4>
          <span className="text-[10px] text-gray-500">{timeAgo}</span>
        </div>
        <p className={cn("truncate text-xs", unread_count > 0 ? "text-gray-300" : "text-gray-500")}>
          {isTyping ? (
            <span className="text-primary-400 italic">typing...</span>
          ) : (
            last_message?.content || "No messages yet"
          )}
        </p>
      </div>
    </button>
  );
};
