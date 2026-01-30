"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { NAVBAR_LINKS } from "@/config/routes";
import { useUserStore } from "@/store/user";
import { cn, normalize } from "@/lib";
import { Logo } from "./logo";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { user } = useUserStore();
  const pathname = usePathname();

  const isOnPathname = (href: string) => normalize(pathname) === href;

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  } as const;

  const linkVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: ["easeInOut"],
      },
    }),
  } as const;

  const mobileMenuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  } as const;

  const mobileLinkVariants: Variants = {
    closed: { x: 50, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.1 + i * 0.05,
        duration: 0.5,
        ease: ["easeInOut"],
      },
    }),
  } as const;

  const overlayVariants = {
    closed: { opacity: 0 },
    open: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  } as const;

  return (
    <>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={cn(
          "top-0 left-0 !z-50 w-screen py-5 transition-all duration-500",
          scrolled ? "fixed bg-black/50 backdrop-blur-md backdrop-filter" : "fixed bg-transparent",
        )}
      >
        <div className="container mx-auto flex max-w-6xl items-center justify-between px-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link href="/">
              <Logo mode="light" />
            </Link>
          </motion.div>
          <div className="hidden items-center gap-x-6 md:flex">
            {NAVBAR_LINKS.map(({ href, label }, i) => (
              <motion.div key={label} custom={i} variants={linkVariants} initial="hidden" animate="visible">
                <Link
                  className={cn(
                    "link group hover:text-primary-100 relative text-sm transition-colors",
                    isOnPathname(href) && "text-primary-400",
                  )}
                  href={href}
                >
                  {label}
                  <motion.span
                    className="bg-primary-100 absolute -bottom-1 left-0 h-0.5 w-0"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="hidden items-center gap-x-4 md:flex">
            {user !== null ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Popover>
                  <PopoverTrigger asChild>
                    <Button className="flex h-auto w-[192px] items-center gap-x-2" variant="outline">
                      <motion.div
                        className="bg-primary-100 size-6 rounded-full"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      />
                      <p className="text-sm">{user.name}</p>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-48 p-2 text-black">
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/home">Profile</Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/applications">Job Applications</Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/settings">Settings</Link>
                    </Button>
                    <hr className="my-2" />
                    <Button variant="ghost" className="w-full justify-start text-red-600" asChild>
                      <Link href="/signout">Sign Out</Link>
                    </Button>
                  </PopoverContent>
                </Popover>
              </motion.div>
            ) : (
              <motion.div
                className="flex items-center gap-x-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild size="sm" variant="default-outline">
                    <Link href="/signin">Sign In</Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild size="sm">
                    <Link href="/signup">Get Started</Link>
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </div>
          <motion.button
            className="flex items-center justify-center p-2 text-white md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 z-50 h-screen w-[80%] max-w-sm bg-black/95 backdrop-blur-lg md:hidden"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="flex h-full flex-col p-6">
                <div className="mb-8 flex items-center justify-between">
                  <Logo mode="light" />
                  <motion.button
                    className="p-2 text-white"
                    onClick={() => setMobileMenuOpen(false)}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={24} />
                  </motion.button>
                </div>
                <div className="flex flex-col gap-y-6">
                  {NAVBAR_LINKS.map(({ href, label }, i) => (
                    <motion.div key={label} custom={i} variants={mobileLinkVariants} initial="closed" animate="open">
                      <Link
                        className="hover:text-primary-100 text-lg font-medium text-white transition-colors"
                        href={href}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  className="mt-auto space-y-4"
                  custom={NAVBAR_LINKS.length}
                  variants={mobileLinkVariants}
                  initial="closed"
                  animate="open"
                >
                  {user !== null ? (
                    <>
                      <div className="flex items-center gap-x-3 rounded-lg border border-white/20 p-4">
                        <div className="bg-primary-100 size-10 rounded-full" />
                        <p className="text-sm text-white">{user.name}</p>
                      </div>
                      <div className="space-y-2">
                        <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10" asChild>
                          <Link href="/home" onClick={() => setMobileMenuOpen(false)}>
                            Profile
                          </Link>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10" asChild>
                          <Link href="/applications" onClick={() => setMobileMenuOpen(false)}>
                            Job Applications
                          </Link>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10" asChild>
                          <Link href="/settings" onClick={() => setMobileMenuOpen(false)}>
                            Settings
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-red-400 hover:bg-red-500/10"
                          asChild
                        >
                          <Link href="/signout" onClick={() => setMobileMenuOpen(false)}>
                            Sign Out
                          </Link>
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <Button
                        className="w-full"
                        size="sm"
                        variant="default-outline"
                        asChild
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Link href="/signin">Sign In</Link>
                      </Button>
                      <Button className="w-full" size="sm" asChild onClick={() => setMobileMenuOpen(false)}>
                        <Link href="/signup">Get Started</Link>
                      </Button>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
