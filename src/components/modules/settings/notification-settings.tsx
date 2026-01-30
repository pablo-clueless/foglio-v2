"use client";

import { RiNotification3Line, RiMailLine, RiSmartphoneLine, RiMessage2Line } from "@remixicon/react";
import { toast } from "sonner";
import React from "react";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

interface NotificationCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  settings: NotificationSetting[];
}

const defaultNotifications: NotificationCategory[] = [
  {
    id: "email",
    title: "Email Notifications",
    description: "Receive updates via email",
    icon: <RiMailLine className="text-primary-100 size-5" />,
    settings: [
      {
        id: "email_applications",
        title: "Application Updates",
        description: "Get notified when your application status changes",
        enabled: true,
      },
      {
        id: "email_messages",
        title: "New Messages",
        description: "Receive email notifications for new messages",
        enabled: true,
      },
      {
        id: "email_jobs",
        title: "Job Recommendations",
        description: "Get personalized job recommendations",
        enabled: false,
      },
      {
        id: "email_newsletter",
        title: "Newsletter",
        description: "Weekly digest of industry news and tips",
        enabled: false,
      },
      {
        id: "email_marketing",
        title: "Marketing Emails",
        description: "Promotional offers and announcements",
        enabled: false,
      },
    ],
  },
  {
    id: "push",
    title: "Push Notifications",
    description: "Receive notifications on your device",
    icon: <RiSmartphoneLine className="text-primary-100 size-5" />,
    settings: [
      {
        id: "push_applications",
        title: "Application Updates",
        description: "Instant alerts for application changes",
        enabled: true,
      },
      {
        id: "push_messages",
        title: "New Messages",
        description: "Get push notifications for new messages",
        enabled: true,
      },
      { id: "push_reminders", title: "Reminders", description: "Task and deadline reminders", enabled: true },
    ],
  },
  {
    id: "inapp",
    title: "In-App Notifications",
    description: "Notifications within the application",
    icon: <RiMessage2Line className="text-primary-100 size-5" />,
    settings: [
      { id: "inapp_activity", title: "Activity Updates", description: "Updates about your activity", enabled: true },
      { id: "inapp_mentions", title: "Mentions", description: "When someone mentions you", enabled: true },
      {
        id: "inapp_announcements",
        title: "Announcements",
        description: "Platform updates and announcements",
        enabled: true,
      },
    ],
  },
];

export const NotificationSettings = () => {
  const [notifications, setNotifications] = React.useState(defaultNotifications);
  const [isSaving, setIsSaving] = React.useState(false);

  const handleToggle = (categoryId: string, settingId: string) => {
    setNotifications((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              settings: category.settings.map((setting) =>
                setting.id === settingId ? { ...setting, enabled: !setting.enabled } : setting,
              ),
            }
          : category,
      ),
    );
  };

  const handleToggleAll = (categoryId: string, enabled: boolean) => {
    setNotifications((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              settings: category.settings.map((setting) => ({ ...setting, enabled })),
            }
          : category,
      ),
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast.success("Notification preferences saved");
  };

  return (
    <div className="space-y-8">
      <div className="border border-white/10 bg-white/5 p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center bg-white/5">
            <RiNotification3Line className="text-primary-100 size-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Notification Preferences</h3>
            <p className="text-sm text-gray-400">Choose how you want to receive notifications</p>
          </div>
        </div>

        <div className="space-y-8">
          {notifications.map((category) => {
            const allEnabled = category.settings.every((s) => s.enabled);
            const someEnabled = category.settings.some((s) => s.enabled);

            return (
              <div key={category.id}>
                <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center bg-white/5">{category.icon}</div>
                    <div>
                      <h4 className="font-medium text-white">{category.title}</h4>
                      <p className="text-sm text-gray-400">{category.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">
                      {allEnabled ? "All on" : someEnabled ? "Some on" : "All off"}
                    </span>
                    <Switch checked={allEnabled} onCheckedChange={(checked) => handleToggleAll(category.id, checked)} />
                  </div>
                </div>

                <div className="space-y-3 pl-4">
                  {category.settings.map((setting) => (
                    <div
                      key={setting.id}
                      className="flex items-center justify-between border border-white/5 bg-white/5 p-4"
                    >
                      <div>
                        <p className="font-medium text-white">{setting.title}</p>
                        <p className="text-sm text-gray-400">{setting.description}</p>
                      </div>
                      <Switch checked={setting.enabled} onCheckedChange={() => handleToggle(category.id, setting.id)} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-end border-t border-white/10 pt-6">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Preferences"}
          </Button>
        </div>
      </div>
    </div>
  );
};
