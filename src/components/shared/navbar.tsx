"use client";

import Link from "next/link";
import React from "react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { NAVBAR_LINKS } from "@/config/routes";
import { useUserStore } from "@/store/user";
import { Logo } from "./logo";
import { cn } from "@/lib";

export const Navbar = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const { user } = useUserStore();

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "top-0 left-0 !z-10 w-screen py-5 transition-all duration-500",
        scrolled ? "fixed bg-black/50 backdrop-blur-xs backdrop-filter" : "fixed bg-transparent",
      )}
    >
      <div className="container mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex items-center gap-x-4">
          {NAVBAR_LINKS.map(({ href, label }) => (
            <Link className="link text-sm" href={href} key={label}>
              {label}
            </Link>
          ))}
        </div>
        {user !== null ? (
          <div className="flex items-center gap-x-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button className="flex h-auto w-[192px] items-center gap-x-2" variant="outline">
                  <div className="bg-primary-100 size-6 rounded-full"></div>
                  <p className="text-sm">{user.name}</p>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-48 p-2">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/me">Profile</Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/me/applications">Job Applications</Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/me/settings">Settings</Link>
                </Button>
                <hr className="my-2" />
                <Button variant="ghost" className="w-full justify-start text-red-600" asChild>
                  <Link href="/signout">Sign Out</Link>
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <div className="flex items-center gap-x-4">
            <Button asChild size="sm" variant="default-outline">
              <Link href="/signin">Sign In</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
