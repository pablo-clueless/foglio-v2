"use client";

import { RiSearchLine, RiMessage3Line, RiLoader4Line } from "@remixicon/react";
import React from "react";

import { ConversationItem } from "./conversation-item";
import { ScrollArea } from "@/components/shared";
import { Input } from "@/components/ui/input";
import type { ConversationResponse } from "@/types";

interface ConversationListProps {
  conversations: ConversationResponse[];
  activeConversationId: string | null;
  typingUsers: Set<string>;
  isLoading: boolean;
  onSelectConversation: (conversation: ConversationResponse) => void;
}

export const ConversationList = ({
  conversations,
  activeConversationId,
  typingUsers,
  isLoading,
  onSelectConversation,
}: ConversationListProps) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredConversations = React.useMemo(() => {
    if (!searchQuery.trim()) return conversations;
    const query = searchQuery.toLowerCase();
    return conversations.filter((conv) => conv.other_user.name.toLowerCase().includes(query));
  }, [conversations, searchQuery]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <RiLoader4Line className="size-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-white/10 p-4">
        <div className="relative">
          <RiSearchLine className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-white/10 bg-white/5 pl-10"
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <RiMessage3Line className="size-12 text-gray-600" />
            <p className="mt-4 text-gray-400">{searchQuery ? "No conversations found" : "No conversations yet"}</p>
            {!searchQuery && <p className="mt-1 text-sm text-gray-500">Start a conversation from a user profile</p>}
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filteredConversations.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                isActive={activeConversationId === conversation.id}
                isTyping={typingUsers.has(conversation.other_user.id)}
                onClick={() => onSelectConversation(conversation)}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
