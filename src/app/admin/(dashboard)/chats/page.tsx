"use client";

import { RiArrowLeftLine } from "@remixicon/react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import React from "react";

import type { ConversationResponse, MessageResponse, WebSocketMessageEvent } from "@/types";
import WebSocketInstance from "@/services/websocket";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/user";
import { cn } from "@/lib";
import {
  useGetConversationsQuery,
  useLazyGetMessagesInConversationQuery,
  useDeleteConversationMutation,
} from "@/api/chat";
import { ChatEmptyState, ChatHeader, ConversationList, MessageInput, MessageList } from "@/components/modules/chat";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
} as const;

const Page = () => {
  const { user } = useUserStore();
  const [activeConversation, setActiveConversation] = React.useState<ConversationResponse | null>(null);
  const [messages, setMessages] = React.useState<MessageResponse[]>([]);
  const [typingUsers, setTypingUsers] = React.useState<Set<string>>(new Set());
  const [showMobileChat, setShowMobileChat] = React.useState(false);

  const {
    data: conversationsData,
    isLoading: isLoadingConversations,
    refetch: refetchConversations,
  } = useGetConversationsQuery({ page: 1, size: 50 }, { refetchOnFocus: true, refetchOnMountOrArgChange: true });

  const [getMessages, { isLoading: isLoadingMessages }] = useLazyGetMessagesInConversationQuery();
  const [deleteConversation] = useDeleteConversationMutation();

  const conversations = conversationsData?.data?.data || [];

  React.useEffect(() => {
    const cleanup = WebSocketInstance.onChatEvent((event: WebSocketMessageEvent) => {
      switch (event.type) {
        case "new_message":
          if (event.message) {
            if (
              activeConversation &&
              (event.message.sender_id === activeConversation.other_user.id ||
                event.message.recipient_id === activeConversation.other_user.id)
            ) {
              setMessages((prev) => [...prev, event.message!]);
              WebSocketInstance.markMessageAsDelivered(event.message.id);
            }
            refetchConversations();
          }
          break;
        case "message_delivered":
          if (event.message) {
            setMessages((prev) =>
              prev.map((msg) => (msg.id === event.message!.id ? { ...msg, status: "DELIVERED" } : msg)),
            );
          }
          break;
        case "message_read":
          if (event.message) {
            setMessages((prev) => prev.map((msg) => (msg.id === event.message!.id ? { ...msg, status: "READ" } : msg)));
          }
          break;
        case "typing":
          if (event.user_id) {
            setTypingUsers((prev) => new Set(prev).add(event.user_id!));
          }
          break;
        case "stop_typing":
          if (event.user_id) {
            setTypingUsers((prev) => {
              const next = new Set(prev);
              next.delete(event.user_id!);
              return next;
            });
          }
          break;
      }
    });
    return cleanup;
  }, [activeConversation, refetchConversations]);

  const handleSelectConversation = async (conversation: ConversationResponse) => {
    setActiveConversation(conversation);
    setShowMobileChat(true);

    try {
      const result = await getMessages({ id: conversation.id, params: { page: 1, size: 100 } }).unwrap();
      setMessages(result.data?.data || []);
    } catch {
      toast.error("Failed to load messages");
    }
  };

  const handleSendMessage = (content: string) => {
    if (!activeConversation || !user) return;

    WebSocketInstance.sendChatMessage({
      action: "send_message",
      recipient_id: activeConversation.other_user.id,
      content,
    });
    const optimisticMessage: MessageResponse = {
      id: `temp-${Date.now()}`,
      conversation_id: activeConversation.id,
      sender_id: user.id,
      sender: {
        id: user.id,
        name: user.name,
        username: user.username || "",
        image: user.image,
      },
      recipient_id: activeConversation.other_user.id,
      recipient: activeConversation.other_user,
      content,
      status: "SENT",
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimisticMessage]);
  };

  const handleTyping = () => {
    if (!activeConversation) return;
    WebSocketInstance.sendTyping(activeConversation.other_user.id);
  };

  const handleStopTyping = () => {
    if (!activeConversation) return;
    WebSocketInstance.sendStopTyping(activeConversation.other_user.id);
  };

  const handleDeleteConversation = async () => {
    if (!activeConversation) return;
    try {
      await deleteConversation(activeConversation.id).unwrap();
      setActiveConversation(null);
      setMessages([]);
      setShowMobileChat(false);
      refetchConversations();
      toast.success("Conversation deleted");
    } catch {
      toast.error("Failed to delete conversation");
    }
  };

  const handleBackToList = () => {
    setShowMobileChat(false);
  };

  if (!user) {
    return <div className="grid h-full w-full place-items-center" />;
  }

  const isTypingInActiveConversation = activeConversation ? typingUsers.has(activeConversation.other_user.id) : false;

  return (
    <motion.div
      className="flex h-full w-full overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={itemVariants}
        className={cn(
          "h-full w-full flex-shrink-0 border-r border-white/10 bg-black/20 md:w-80 lg:w-96",
          showMobileChat ? "hidden md:block" : "block",
        )}
      >
        <div className="border-b border-white/10 p-4">
          <h2 className="text-lg font-semibold text-white">Messages</h2>
          <p className="text-sm text-gray-400">{conversations.length} conversations</p>
        </div>
        <ConversationList
          conversations={conversations}
          activeConversationId={activeConversation?.id || null}
          typingUsers={typingUsers}
          isLoading={isLoadingConversations}
          onSelectConversation={handleSelectConversation}
        />
      </motion.div>
      <motion.div
        variants={itemVariants}
        className={cn("flex h-full flex-1 flex-col", showMobileChat ? "block" : "hidden md:flex")}
      >
        {activeConversation ? (
          <>
            <div className="flex items-center gap-2 border-b border-white/10 bg-black/20 p-2 md:hidden">
              <Button variant="ghost" size="icon" onClick={handleBackToList}>
                <RiArrowLeftLine className="size-5" />
              </Button>
            </div>
            <ChatHeader
              user={activeConversation.other_user}
              isTyping={isTypingInActiveConversation}
              onDeleteConversation={handleDeleteConversation}
            />
            {messages.length === 0 && !isLoadingMessages ? (
              <ChatEmptyState
                type="no-messages"
                onSendMessage={handleSendMessage}
                onTyping={handleTyping}
                onStopTyping={handleStopTyping}
              />
            ) : (
              <>
                <MessageList
                  messages={messages}
                  currentUserId={user.id}
                  isLoading={isLoadingMessages}
                  isTyping={isTypingInActiveConversation}
                  typingUserName={activeConversation.other_user.name}
                />
                <MessageInput
                  onSendMessage={handleSendMessage}
                  onTyping={handleTyping}
                  onStopTyping={handleStopTyping}
                />
              </>
            )}
          </>
        ) : (
          <ChatEmptyState type={conversations.length === 0 ? "no-conversations" : "no-selection"} />
        )}
      </motion.div>
    </motion.div>
  );
};

export default Page;
