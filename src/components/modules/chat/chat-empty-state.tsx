"use client";

import { RiMessage3Line, RiChatSmile2Line } from "@remixicon/react";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { MessageInput } from "./message-input";

interface ChatEmptyStateProps {
  type: "no-conversations" | "no-selection" | "no-messages";
  onSendMessage?: (content: string) => void;
  onTyping?: () => void;
  onStopTyping?: () => void;
}

export const ChatEmptyState = ({ type, onSendMessage, onTyping, onStopTyping }: ChatEmptyStateProps) => {
  console.log({ type });
  if (type === "no-conversations") {
    return (
      <div className="flex h-[calc(100%-80px)] flex-col items-center justify-center p-8 text-center">
        <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-white/5">
          <RiMessage3Line className="size-8 text-gray-500" />
        </div>
        <h3 className="text-lg font-semibold text-white">No conversations yet</h3>
        <p className="mt-2 max-w-sm text-sm text-gray-400">
          Start a conversation by visiting a user&apos;s profile in the talent pool and clicking the message button.
        </p>
        <Button asChild className="mt-6">
          <Link href="/talent-pool">Browse Talent Pool</Link>
        </Button>
      </div>
    );
  }

  if (type === "no-selection") {
    return (
      <div className="flex h-[calc(100%-80px)] flex-col items-center justify-center p-8 text-center">
        <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-white/5">
          <RiChatSmile2Line className="size-8 text-gray-500" />
        </div>
        <h3 className="text-lg font-semibold text-white">Select a conversation</h3>
        <p className="mt-2 max-w-sm text-sm text-gray-400">Choose a conversation from the list to start messaging.</p>
      </div>
    );
  }

  if (type === "no-messages") {
    return (
      <div className="flex h-[calc(100%-80px)] flex-col">
        <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-white/5">
            <RiMessage3Line className="size-8 text-gray-500" />
          </div>
          <h3 className="text-lg font-semibold text-white">No messages yet</h3>
          <p className="mt-2 max-w-sm text-sm text-gray-400">Send a message to start the conversation.</p>
        </div>
        {onSendMessage && onTyping && onStopTyping && (
          <MessageInput onSendMessage={onSendMessage} onTyping={onTyping} onStopTyping={onStopTyping} />
        )}
      </div>
    );
  }

  return null;
};
