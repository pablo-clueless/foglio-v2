"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

import { DASHBOARD_ROUTES } from "@/config/routes";
import { WithAuth } from "@/components/providers";
import { AppHeader } from "@/components/shared";
import { useAppSelector } from "@/hooks";
import { cn, normalize } from "@/lib";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  const { user } = useAppSelector((state) => state.auth);
  const pathname = usePathname();

  const isActive = (href: string) => href === normalize(pathname);
  const isRecruiter = user?.is_recruiter || false;

  return (
    <WithAuth>
      <div className="flex h-screen w-screen items-start overflow-hidden">
        <aside className="h-full w-[250px] border-r">
          <div className="h-20 w-full"></div>
          <div className="h-[calc(100%-56px)] w-full p-4">
            <div className="w-full space-y-3">
              {DASHBOARD_ROUTES(isRecruiter).map((route) => (
                <Link
                  className={cn(
                    "hover:bg-primary-100/25 flex items-center gap-x-2 rounded-md px-4 py-3 text-sm font-medium",
                    isActive(route.href) && "bg-primary-400 text-black",
                    !route.show && "hidden",
                  )}
                  href={route.href}
                  key={route.href}
                >
                  <route.icon className="size-4" />
                  {route.label}
                </Link>
              ))}
            </div>
          </div>
        </aside>
        <div className="h-full flex-1">
          <AppHeader />
          <div className="h-[calc(100%-56px)] w-full p-4">{children}</div>
        </div>
      </div>
    </WithAuth>
  );
}
