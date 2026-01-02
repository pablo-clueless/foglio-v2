import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <aside className="h-full w-[285px]"></aside>
      <div className="h-full flex-1">
        <div className="h-14 w-full"></div>
        <div className="h-[calc(100%-56px)] w-full">{children}</div>
      </div>
    </div>
  );
}
