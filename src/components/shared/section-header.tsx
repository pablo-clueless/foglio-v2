import type { Icon } from "@phosphor-icons/react";
import React from "react";

interface Props {
  icon: Icon;
  title: string;
}

export const SectionHeader = ({ icon: Icon, title }: Props) => {
  return (
    <div className="bg-primary-400 flex w-fit items-center gap-x-1 rounded px-3 py-1 text-white">
      <Icon className="size-4" />
      <p className="text-sm font-medium">{title}</p>
    </div>
  );
};
