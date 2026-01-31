"use client";

import { RiCheckLine, RiCheckDoubleLine, RiTimeLine } from "@remixicon/react";
import { format } from "date-fns";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { MessageResponse } from "@/types";
import { getInitials, cn } from "@/lib";

interface MessageItemProps {
  message: MessageResponse;
  isOwn: boolean;
  showAvatar?: boolean;
}

const MessageStatus = ({ status }: { status: string }) => {
  switch (status) {
    case "READ":
      return <RiCheckDoubleLine className="text-primary-400 size-3.5" />;
    case "DELIVERED":
      return <RiCheckDoubleLine className="size-3.5 text-gray-400" />;
    case "SENT":
      return <RiCheckLine className="size-3.5 text-gray-400" />;
    default:
      return <RiTimeLine className="size-3.5 text-gray-500" />;
  }
};

export const MessageItem = ({ message, isOwn, showAvatar = true }: MessageItemProps) => {
  const time = format(new Date(message.created_at), "h:mm a");
  const sender = message.sender;

  return (
    <div className={cn("flex gap-3", isOwn ? "flex-row-reverse" : "flex-row")}>
      {showAvatar && !isOwn && (
        <Avatar className="size-8 shrink-0">
          <AvatarImage src={sender?.image} />
          <AvatarFallback className="bg-gray-700 text-xs font-bold text-white">
            {getInitials(sender?.name)}
          </AvatarFallback>
        </Avatar>
      )}
      {!showAvatar && !isOwn && <div className="size-8 shrink-0" />}

      <div className={cn("max-w-[70%]", isOwn ? "items-end" : "items-start")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-2",
            isOwn ? "bg-primary-400 rounded-br-sm text-black" : "rounded-bl-sm bg-white/10 text-white",
          )}
        >
          <p className="text-sm break-words whitespace-pre-wrap">{message.content}</p>
        </div>
        <div className={cn("mt-1 flex items-center gap-1", isOwn ? "justify-end" : "justify-start")}>
          <span className="text-xs text-gray-500">{time}</span>
          {isOwn && <MessageStatus status={message.status} />}
        </div>
      </div>
    </div>
  );
};
