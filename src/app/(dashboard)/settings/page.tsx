"use client";

import { RiUserLine, RiVipCrownLine, RiNotification3Line, RiShieldCheckLine } from "@remixicon/react";
import { motion } from "framer-motion";
import React from "react";

import { ScrollArea, TabPanel } from "@/components/shared";
import { cn } from "@/lib";
import {
  ProfileSettings,
  BillingSettings,
  NotificationSettings,
  SecuritySettings,
} from "@/components/modules/settings";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
} as const;

const tabs = [
  { id: "profile", label: "Profile", icon: RiUserLine },
  { id: "billing", label: "Billing", icon: RiVipCrownLine },
  { id: "notifications", label: "Notifications", icon: RiNotification3Line },
  { id: "security", label: "Security", icon: RiShieldCheckLine },
] as const;

type TabId = (typeof tabs)[number]["id"];

const Page = () => {
  const [activeTab, setActiveTab] = React.useState<TabId>("profile");

  return (
    <ScrollArea>
      <motion.div className="w-full space-y-6 pb-10" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants}>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-gray-400">Manage your account settings and preferences</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary-400 text-black"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white",
                  )}
                >
                  <Icon className="size-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </motion.div>
        <motion.div variants={itemVariants}>
          <TabPanel selected={activeTab} value="profile">
            <ProfileSettings />
          </TabPanel>
          <TabPanel selected={activeTab} value="billing">
            <BillingSettings />
          </TabPanel>
          <TabPanel selected={activeTab} value="notifications">
            <NotificationSettings />
          </TabPanel>
          <TabPanel selected={activeTab} value="security">
            <SecuritySettings />
          </TabPanel>
        </motion.div>
      </motion.div>
    </ScrollArea>
  );
};

export default Page;
