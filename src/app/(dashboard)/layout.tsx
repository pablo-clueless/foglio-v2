"use client";

import { RiMenuLine, RiCloseLine } from "@remixicon/react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

import { DASHBOARD_ROUTES } from "@/config/routes";
import { WithAuth } from "@/components/providers";
import { AppHeader, Logo } from "@/components/shared";
import { useAppSelector } from "@/hooks";
import { cn, normalize } from "@/lib";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  const { user } = useAppSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => href === normalize(pathname);
  const isRecruiter = user?.is_recruiter || false;

  const currentRoute = DASHBOARD_ROUTES(isRecruiter).find((route) => isActive(route.href));

  return (
    <WithAuth>
      <div className="flex h-screen w-screen overflow-hidden bg-black">
        <button
          className="fixed top-4 left-4 z-50 grid size-10 place-items-center rounded-lg bg-black/80 md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <RiCloseLine className="size-5" /> : <RiMenuLine className="size-5" />}
        </button>
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>
        <aside
          className={cn(
            "border-primary-100/15 fixed z-50 flex h-full w-[260px] flex-col border-r bg-black/95 transition-transform md:relative md:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="border-primary-100/15 flex h-16 items-center border-b px-6">
            <Link href="/" className="flex items-center gap-x-2">
              <Logo mode="light" />
            </Link>
          </div>
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {DASHBOARD_ROUTES(isRecruiter).map((route) => {
                if (!route.show) return null;
                const active = isActive(route.href);
                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "group flex items-center gap-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                      active ? "bg-primary-400/10 text-primary-400" : "text-gray-400 hover:bg-white/5 hover:text-white",
                    )}
                  >
                    <route.icon
                      className={cn(
                        "size-5 transition-colors",
                        active ? "text-primary-400" : "text-gray-500 group-hover:text-gray-300",
                      )}
                    />
                    {route.label}
                    {active && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="bg-primary-400 ml-auto h-1.5 w-1.5 rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>
          <div className="border-primary-100/15 border-t p-4">
            <div className="flex items-center gap-x-3 rounded-lg bg-white/5 p-3">
              <div className="bg-primary-400 grid size-10 place-items-center rounded-lg text-sm font-bold text-black">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium">{user?.name}</p>
                <p className="truncate text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
          </div>
        </aside>
        <div className="flex h-full flex-1 flex-col overflow-hidden">
          <AppHeader title={currentRoute?.label} />
          <main className="flex-1 overflow-y-auto bg-gradient-to-br from-black via-black to-gray-950 p-6">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </WithAuth>
  );
}
