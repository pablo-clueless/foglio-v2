"use client";

import { RiNotification3Line, RiMailLine, RiSmartphoneLine, RiMessage2Line, RiLoader4Line } from "@remixicon/react";
import { toast } from "sonner";
import React from "react";

import { useGetNotificationSettingsQuery, useUpdateNotificationSettingsMutation } from "@/api/notification";
import type { EmailNotificationSettings, PushNotificationSettings, InAppNotificationSettings } from "@/types";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface NotificationSetting {
  id: string;
  key: string;
  title: string;
  description: string;
  enabled: boolean;
}

interface NotificationCategory {
  id: "email" | "push" | "inapp";
  title: string;
  description: string;
  icon: React.ReactNode;
  settings: NotificationSetting[];
}

const DEFAULT_EMAIL_SETTINGS: EmailNotificationSettings = {
  app_updates: true,
  new_messages: true,
  job_recommendations: false,
  newsletter: false,
  marketing_emails: false,
};

const DEFAULT_PUSH_SETTINGS: PushNotificationSettings = {
  app_updates: true,
  new_messages: true,
  reminders: true,
};

const DEFAULT_INAPP_SETTINGS: InAppNotificationSettings = {
  activity_updates: true,
  mentions: true,
  announcements: true,
};

const createNotificationCategories = (
  email: EmailNotificationSettings,
  push: PushNotificationSettings,
  inApp: InAppNotificationSettings,
): NotificationCategory[] => [
  {
    id: "email",
    title: "Email Notifications",
    description: "Receive updates via email",
    icon: <RiMailLine className="text-primary-100 size-5" />,
    settings: [
      {
        id: "email_app_updates",
        key: "app_updates",
        title: "Application Updates",
        description: "Get notified when your application status changes",
        enabled: email.app_updates,
      },
      {
        id: "email_new_messages",
        key: "new_messages",
        title: "New Messages",
        description: "Receive email notifications for new messages",
        enabled: email.new_messages,
      },
      {
        id: "email_job_recommendations",
        key: "job_recommendations",
        title: "Job Recommendations",
        description: "Get personalized job recommendations",
        enabled: email.job_recommendations,
      },
      {
        id: "email_newsletter",
        key: "newsletter",
        title: "Newsletter",
        description: "Weekly digest of industry news and tips",
        enabled: email.newsletter,
      },
      {
        id: "email_marketing_emails",
        key: "marketing_emails",
        title: "Marketing Emails",
        description: "Promotional offers and announcements",
        enabled: email.marketing_emails,
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
        id: "push_app_updates",
        key: "app_updates",
        title: "Application Updates",
        description: "Instant alerts for application changes",
        enabled: push.app_updates,
      },
      {
        id: "push_new_messages",
        key: "new_messages",
        title: "New Messages",
        description: "Get push notifications for new messages",
        enabled: push.new_messages,
      },
      {
        id: "push_reminders",
        key: "reminders",
        title: "Reminders",
        description: "Task and deadline reminders",
        enabled: push.reminders,
      },
    ],
  },
  {
    id: "inapp",
    title: "In-App Notifications",
    description: "Notifications within the application",
    icon: <RiMessage2Line className="text-primary-100 size-5" />,
    settings: [
      {
        id: "inapp_activity_updates",
        key: "activity_updates",
        title: "Activity Updates",
        description: "Updates about your activity",
        enabled: inApp.activity_updates,
      },
      {
        id: "inapp_mentions",
        key: "mentions",
        title: "Mentions",
        description: "When someone mentions you",
        enabled: inApp.mentions,
      },
      {
        id: "inapp_announcements",
        key: "announcements",
        title: "Announcements",
        description: "Platform updates and announcements",
        enabled: inApp.announcements,
      },
    ],
  },
];

export const NotificationSettings = () => {
  const [emailSettings, setEmailSettings] = React.useState<EmailNotificationSettings>(DEFAULT_EMAIL_SETTINGS);
  const [pushSettings, setPushSettings] = React.useState<PushNotificationSettings>(DEFAULT_PUSH_SETTINGS);
  const [inAppSettings, setInAppSettings] = React.useState<InAppNotificationSettings>(DEFAULT_INAPP_SETTINGS);
  const [hasChanges, setHasChanges] = React.useState(false);

  const { data, isLoading, isError } = useGetNotificationSettingsQuery(null);
  const [updateSettings, { isLoading: isSaving }] = useUpdateNotificationSettingsMutation();

  // Initialize state from API response
  React.useEffect(() => {
    if (data?.data) {
      setEmailSettings(data.data.email || DEFAULT_EMAIL_SETTINGS);
      setPushSettings(data.data.push || DEFAULT_PUSH_SETTINGS);
      setInAppSettings(data.data.in_app || DEFAULT_INAPP_SETTINGS);
      setHasChanges(false);
    }
  }, [data]);

  const notifications = createNotificationCategories(emailSettings, pushSettings, inAppSettings);

  const handleToggle = (categoryId: "email" | "push" | "inapp", key: string) => {
    setHasChanges(true);

    switch (categoryId) {
      case "email":
        setEmailSettings((prev) => ({
          ...prev,
          [key]: !prev[key as keyof EmailNotificationSettings],
        }));
        break;
      case "push":
        setPushSettings((prev) => ({
          ...prev,
          [key]: !prev[key as keyof PushNotificationSettings],
        }));
        break;
      case "inapp":
        setInAppSettings((prev) => ({
          ...prev,
          [key]: !prev[key as keyof InAppNotificationSettings],
        }));
        break;
    }
  };

  const handleToggleAll = (categoryId: "email" | "push" | "inapp", enabled: boolean) => {
    setHasChanges(true);

    switch (categoryId) {
      case "email":
        setEmailSettings({
          app_updates: enabled,
          new_messages: enabled,
          job_recommendations: enabled,
          newsletter: enabled,
          marketing_emails: enabled,
        });
        break;
      case "push":
        setPushSettings({
          app_updates: enabled,
          new_messages: enabled,
          reminders: enabled,
        });
        break;
      case "inapp":
        setInAppSettings({
          activity_updates: enabled,
          mentions: enabled,
          announcements: enabled,
        });
        break;
    }
  };

  const handleSave = async () => {
    try {
      await updateSettings({
        email: emailSettings,
        push: pushSettings,
        in_app: inAppSettings,
      }).unwrap();

      setHasChanges(false);
      toast.success("Notification preferences saved");
    } catch {
      toast.error("Failed to save notification preferences");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-center py-12">
            <RiLoader4Line className="size-8 animate-spin text-gray-400" />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-8">
        <div className="border border-white/10 bg-white/5 p-6">
          <div className="py-12 text-center">
            <RiNotification3Line className="mx-auto size-12 text-gray-600" />
            <p className="mt-4 text-gray-400">Failed to load notification settings</p>
            <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
                      <Switch
                        checked={setting.enabled}
                        onCheckedChange={() => handleToggle(category.id, setting.key)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-end border-t border-white/10 pt-6">
          <Button onClick={handleSave} disabled={isSaving || !hasChanges}>
            {isSaving ? "Saving..." : "Save Preferences"}
          </Button>
        </div>
      </div>
    </div>
  );
};
