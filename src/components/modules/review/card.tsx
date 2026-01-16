import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { ReviewProps } from "@/types";

interface Props {
  review: ReviewProps;
}

export const Card = ({ review }: Props) => {
  return (
    <div className="border-primary-100/15 h-full w-full shrink-0 border p-4 sm:p-8">
      <div className=""></div>
      <div className="flex items-center justify-between">
        <div className="space-y-4">
          <Avatar className="size-16 rounded-none sm:size-28">
            <AvatarImage src={review.reviewer.image} />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm sm:text-base">{review.reviewer.name}</p>
            <p className="text-xs text-gray-400 sm:text-sm">{review.reviewer.role}</p>
          </div>
        </div>
        <div className=""></div>
      </div>
    </div>
  );
};
