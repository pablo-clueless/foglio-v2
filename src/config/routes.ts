import {
  RiBriefcase2Line,
  RiBuilding2Line,
  RiDashboardLine,
  RiFilePdf2Line,
  RiFileTextLine,
  RiGroup3Line,
  RiHome2Line,
  RiPieChart2Line,
  RiSettings4Line,
  RiUserSettingsLine,
} from "@remixicon/react";

export const DASHBOARD_ROUTES = (isRecruiter: boolean) => {
  return [
    {
      label: "Home",
      href: "/home",
      icon: RiHome2Line,
      show: true,
    },
    {
      label: "Resume",
      href: "/resume",
      icon: RiFilePdf2Line,
      show: !isRecruiter,
    },
    {
      label: "Analytics",
      href: "/analytics",
      icon: RiPieChart2Line,
      show: isRecruiter,
    },
    {
      label: "Applications",
      href: "/applications",
      icon: RiFileTextLine,
      show: true,
    },
    {
      label: "Company",
      href: "/company",
      icon: RiBuilding2Line,
      show: isRecruiter,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: RiSettings4Line,
      show: true,
    },
  ];
};

export const ADMIN_ROUTES = [
  {
    label: "Dashboard",
    href: "/super-admin/dashboard",
    icon: RiDashboardLine,
  },
  {
    label: "Users",
    href: "/super-admin/users",
    icon: RiGroup3Line,
  },
  {
    label: "Recruiters",
    href: "/super-admin/recruiters",
    icon: RiUserSettingsLine,
  },
  {
    label: "Jobs",
    href: "/super-admin/jobs",
    icon: RiBriefcase2Line,
  },
  {
    label: "Settings",
    href: "/super-admin/settings",
    icon: RiSettings4Line,
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

export const PUBLIC_ROUTES = [
  "/",
  "/forgot-password",
  "/jobs",
  "/reset-password",
  "/recruiters",
  "/privacy-policy",
  "/signin",
  "/signup",
  "/talents",
  "/terms-of-service",
];
