// import Link from "next/link";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { UserProps } from "@/types";
import { getInitials } from "@/lib";

interface Props {
  user: UserProps;
}

export const Card = ({ user }: Props) => {
  return (
    <div className="border-primary-100/15 hover:bg-primary-100/25 group block aspect-square border">
      <Avatar className="size-full rounded-none">
        <AvatarImage src={user.image} />
        <AvatarFallback className="rounded-none text-2xl sm:text-6xl">{getInitials(user.name)}</AvatarFallback>
      </Avatar>
    </div>
  );
};
