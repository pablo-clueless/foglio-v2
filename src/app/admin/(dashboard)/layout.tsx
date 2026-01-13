import React from "react";

import { WithAuth } from "@/components/providers";
import { AppHeader } from "@/components/shared";
import { ADMIN_ROUTES } from "@/config/routes";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <WithAuth>
      <div className="h-screen w-screen overflow-hidden">
        <aside className="h-full w-[285px]">
          <div className="h-20 w-full"></div>
          <div className="h-[calc(100%-56px)] w-full">
            {ADMIN_ROUTES.map((route) => (
              <div className="flex items-center gap-x-2" key={route.href}>
                {route.label}
              </div>
            ))}
          </div>
        </aside>
        <div className="h-full flex-1">
          <AppHeader />
          <div className="h-[calc(100%-56px)] w-full">{children}</div>
        </div>
      </div>
    </WithAuth>
  );
}
