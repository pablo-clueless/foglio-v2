"use client";

import { RiLoader4Line } from "@remixicon/react";
import { format, isToday, isYesterday, isSameDay } from "date-fns";
import React from "react";

import { MessageItem } from "./message-item";
import { ScrollArea } from "@/components/shared";
import type { MessageResponse } from "@/types";

interface MessageListProps {
  messages: MessageResponse[];
  currentUserId: string;
  isLoading: boolean;
  isTyping: boolean;
  typingUserName?: string;
}

const formatDateDivider = (date: Date): string => {
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  return format(date, "MMMM d, yyyy");
};

export const MessageList = ({ messages, currentUserId, isLoading, isTyping, typingUserName }: MessageListProps) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const bottomRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const groupedMessages = React.useMemo(() => {
    const groups: { date: Date; messages: MessageResponse[] }[] = [];
    let currentGroup: { date: Date; messages: MessageResponse[] } | null = null;

    messages.forEach((message) => {
      const messageDate = new Date(message.created_at);
      if (!currentGroup || !isSameDay(currentGroup.date, messageDate)) {
        currentGroup = { date: messageDate, messages: [] };
        groups.push(currentGroup);
      }
      currentGroup.messages.push(message);
    });

    return groups;
  }, [messages]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <RiLoader4Line className="size-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100%-80px)] flex-1 p-4" ref={scrollRef}>
      <div className="space-y-6">
        {groupedMessages.map((group, groupIndex) => (
          <div key={groupIndex}>
            <div className="flex items-center justify-center py-4">
              <div className="rounded-full bg-white/10 px-3 py-1">
                <span className="text-xs text-gray-400">{formatDateDivider(group.date)}</span>
              </div>
            </div>
            <div className="space-y-3">
              {group.messages.map((message, index) => {
                const isOwn = message.sender_id === currentUserId;
                const prevMessage = group.messages[index - 1];
                const showAvatar = !prevMessage || prevMessage.sender_id !== message.sender_id;

                return <MessageItem key={message.id} message={message} isOwn={isOwn} showAvatar={showAvatar} />;
              })}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 pl-11">
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-white/10 px-4 py-2">
              <span className="size-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
              <span className="size-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
              <span className="size-2 animate-bounce rounded-full bg-gray-400" />
            </div>
            <span className="text-xs text-gray-500">{typingUserName} is typing...</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
};
