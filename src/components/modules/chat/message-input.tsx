"use client";

import { RiSendPlaneFill, RiAttachment2, RiEmotionHappyLine } from "@remixicon/react";
import React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  onTyping: () => void;
  onStopTyping: () => void;
  disabled?: boolean;
}

export const MessageInput = ({ onSendMessage, onTyping, onStopTyping, disabled }: MessageInputProps) => {
  const [message, setMessage] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const typingTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessage(value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }

    if (value.trim() && !isTyping) {
      setIsTyping(true);
      onTyping();
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    if (value.trim()) {
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        onStopTyping();
      }, 2000);
    } else {
      setIsTyping(false);
      onStopTyping();
    }
  };

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || disabled) return;

    onSendMessage(trimmedMessage);
    setMessage("");
    setIsTyping(false);
    onStopTyping();

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  React.useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="border-t border-white/10 bg-black/20 p-4">
      <div className="flex items-end gap-2">
        <Button variant="ghost" size="icon" className="shrink-0 text-gray-400 hover:text-white" disabled={disabled}>
          <RiAttachment2 className="size-5" />
        </Button>
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            disabled={disabled}
            rows={1}
            className={cn(
              "w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12",
              "text-sm text-white placeholder:text-gray-500",
              "focus:border-primary-400/50 focus:ring-primary-400/50 focus:ring-1 focus:outline-none",
              "disabled:cursor-not-allowed disabled:opacity-50",
            )}
            style={{ maxHeight: "120px" }}
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 bottom-1.5 text-gray-400 hover:text-white"
            disabled={disabled}
          >
            <RiEmotionHappyLine className="size-5" />
          </Button>
        </div>
        <Button onClick={handleSend} disabled={!message.trim() || disabled} className="shrink-0 rounded-xl" size="icon">
          <RiSendPlaneFill className="size-5" />
        </Button>
      </div>
    </div>
  );
};
