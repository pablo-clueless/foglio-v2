import {
  RiBriefcase2Line,
  RiBriefcase3Line,
  RiBuilding2Line,
  RiDashboardLine,
  RiFilePdf2Line,
  RiFileTextLine,
  RiFunctionAiLine,
  RiGroup3Line,
  RiHome2Line,
  RiMessage3Line,
  RiPieChart2Line,
  RiSettings4Line,
  RiUserSettingsLine,
  RiWallet2Line,
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
      label: "Analytics",
      href: "/analytics",
      icon: RiPieChart2Line,
      show: isRecruiter,
    },
    {
      label: "Resume",
      href: "/resume",
      icon: RiFilePdf2Line,
      show: !isRecruiter,
    },
    {
      label: "Jobs",
      href: "/vacancies",
      icon: RiBriefcase3Line,
      show: isRecruiter,
    },
    {
      label: "Applications",
      href: "/applications",
      icon: RiFileTextLine,
      show: !isRecruiter,
    },
    {
      label: "Company",
      href: "/company",
      icon: RiBuilding2Line,
      show: isRecruiter,
    },
    {
      label: "Chats",
      href: "/chats",
      icon: RiMessage3Line,
      show: true,
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
    href: "/admin/dashboard",
    icon: RiDashboardLine,
  },
  {
    label: "Features",
    href: "/admin/features",
    icon: RiFunctionAiLine,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: RiGroup3Line,
  },
  {
    label: "Recruiters",
    href: "/admin/recruiters",
    icon: RiUserSettingsLine,
  },
  {
    label: "Jobs",
    href: "/admin/jobs",
    icon: RiBriefcase2Line,
  },
  {
    label: "Billing",
    href: "/admin/billing",
    icon: RiWallet2Line,
  },
  {
    label: "Settings",
    href: "/admin/settings",
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
      {
        name: "Talent Pool",
        href: "/talent-pool",
      },
    ],
  },
  {
    label: "Company",
    links: [
      {
        name: "Help Center",
        href: "/help-center",
      },
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
  {
    label: "Talent Pool",
    href: "/talent-pool",
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
