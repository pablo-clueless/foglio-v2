"use client";

import { FileTextIcon, GearIcon, HouseIcon, UserGearIcon, UserIcon, UsersIcon } from "@phosphor-icons/react";

export const DASHBOARD_ROUTES = [
  {
    label: "Home",
    href: "/",
    icon: HouseIcon,
  },
  {
    label: "Me",
    href: "/me",
    icon: UserIcon,
  },
  {
    label: "Applications",
    href: "/me/applications",
    icon: FileTextIcon,
  },
  {
    label: "Settings",
    href: "/me/settings",
    icon: GearIcon,
  },
];

export const ADMIN_ROUTES = [
  {
    label: "Dashboard",
    href: "/super-admin/dashboard",
    icon: UserIcon,
  },
  {
    label: "Users",
    href: "/super-admin/users",
    icon: UsersIcon,
  },
  {
    label: "Recruiters",
    href: "/super-admin/recruiters",
    icon: UserGearIcon,
  },
  {
    label: "Jobs",
    href: "/super-admin/jobs",
    icon: UserGearIcon,
  },
  {
    label: "Settings",
    href: "/super-admin/settings",
    icon: GearIcon,
  },
];

export const FOOTER_ROUTES = [
  {
    label: "Features",
    links: [
      {
        name: "Jobs",
        href: "/jobs",
      },
      {
        name: "For Recruiters",
        href: "/recruiters",
      },
      {
        name: "For Talents",
        href: "/talents",
      },
    ],
  },
  {
    label: "Company",
    links: [
      {
        name: "Privacy Policy",
        href: "/privacy-policy",
      },
      {
        name: "Terms of Service",
        href: "/terms-of-service",
      },
    ],
  },
  {
    label: "Connect",
    links: [
      {
        name: "LinkedIn",
        href: "https://linkedin.com/in/samson-okunola",
      },
      {
        name: "GitHub",
        href: "https://github.com/pablo-clueless",
      },
      {
        name: "Twitter",
        href: "https://x.com/pablo_clueless",
      },
    ],
  },
];

export const NAVBAR_LINKS = [
  {
    label: "Jobs",
    href: "/jobs",
  },
  {
    label: "For Recruiters",
    href: "/recruiters",
  },
  {
    label: "For Talents",
    href: "/talents",
  },
];

export const PUBLIC_ROUTES = ["/", "/signin", "/signup", "forgot-password", "/reset-password", "/verification", "/"];
