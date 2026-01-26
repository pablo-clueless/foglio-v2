"use client";

import { RiMenuLine, RiCloseLine, RiShieldLine } from "@remixicon/react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

import { WithAuth } from "@/components/providers";
import { AppHeader, Logo } from "@/components/shared";
import { ADMIN_ROUTES } from "@/config/routes";
import { useAppSelector } from "@/hooks";
import { cn, normalize } from "@/lib";

interface Props {
  children: React.ReactNode;
}

export default function AdminDashboardLayout({ children }: Props) {
  const { user } = useAppSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => href === normalize(pathname);
  const currentRoute = ADMIN_ROUTES.find((route) => isActive(route.href));

  return (
    <WithAuth>
      <div className="flex h-screen w-screen overflow-hidden bg-black">
        {/* Mobile Menu Button */}
        <button
          className="fixed left-4 top-4 z-50 grid size-10 place-items-center rounded-lg bg-black/80 md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <RiCloseLine className="size-5" /> : <RiMenuLine className="size-5" />}
        </button>

        {/* Mobile Overlay */}
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

        {/* Sidebar */}
        <aside
          className={cn(
            "fixed z-50 flex h-full w-[280px] flex-col border-r border-red-500/20 bg-gradient-to-b from-black via-black to-red-950/10 transition-transform md:relative md:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b border-red-500/20 px-6">
            <Link href="/" className="flex items-center gap-x-2">
              <Logo mode="light" />
            </Link>
            <span className="rounded-md bg-red-500/20 px-2 py-1 text-xs font-semibold text-red-400">Admin</span>
          </div>

          {/* Admin Badge */}
          <div className="border-b border-red-500/20 p-4">
            <div className="flex items-center gap-x-3 rounded-lg bg-red-500/10 p-3">
              <div className="grid size-10 place-items-center rounded-lg bg-red-500/20">
                <RiShieldLine className="size-5 text-red-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-red-400">Super Admin</p>
                <p className="text-xs text-gray-500">Full Access</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-gray-600">Management</p>
            <div className="space-y-1">
              {ADMIN_ROUTES.map((route) => {
                const active = isActive(route.href);
                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "group flex items-center gap-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                      active
                        ? "bg-red-500/20 text-red-400"
                        : "text-gray-400 hover:bg-white/5 hover:text-white",
                    )}
                  >
                    <route.icon
                      className={cn(
                        "size-5 transition-colors",
                        active ? "text-red-400" : "text-gray-500 group-hover:text-gray-300",
                      )}
                    />
                    {route.label}
                    {active && (
                      <motion.div
                        layoutId="adminActiveIndicator"
                        className="ml-auto h-1.5 w-1.5 rounded-full bg-red-400"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Admin User Info */}
          <div className="border-t border-red-500/20 p-4">
            <div className="flex items-center gap-x-3 rounded-lg bg-white/5 p-3">
              <div className="grid size-10 place-items-center rounded-lg bg-red-500 text-sm font-bold text-white">
                {user?.name?.charAt(0)?.toUpperCase() || "A"}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium">{user?.name}</p>
                <p className="truncate text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex h-full flex-1 flex-col overflow-hidden">
          <AppHeader title={currentRoute?.label} showSearch={false} />
          <main className="flex-1 overflow-y-auto bg-gradient-to-br from-black via-gray-950 to-red-950/5 p-6">
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
