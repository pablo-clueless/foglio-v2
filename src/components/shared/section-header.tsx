import React from "react";

interface Props {
  label: string;
  subtitle: string;
  title: string;
}

export const SectionHeader = ({ label, subtitle, title }: Props) => {
  return (
    <div className="flex w-full flex-col gap-y-4 px-10 sm:px-0">
      <div className="border-primary-400 bg-primary-100/25 w-fit border-l px-2 py-1 text-xs uppercase">{label}</div>
      <div className="space-y-1">
        <h3 className="text-xl font-semibold sm:text-4xl">{title}</h3>
        <p className="w-full text-sm text-gray-600 sm:w-1/2 sm:text-base">{subtitle}</p>
      </div>
    </div>
  );
};
