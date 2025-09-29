import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { NAVBAR_LINKS } from "@/config/routes";
import { cn } from "@/lib";

export const Navbar = () => {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "top-0 left-0 !z-10 w-screen py-5 transition-all duration-500",
        scrolled ? "fixed bg-white/50 backdrop-blur-xs backdrop-filter" : "fixed bg-transparent",
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">Foglio</h1>
        <div className="flex items-center gap-x-4">
          {NAVBAR_LINKS.map(({ href, label }) => (
            <Link className="link text-sm" href={href} key={label}>
              {label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-x-4">
          <Button asChild size="sm" variant="outline">
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};
