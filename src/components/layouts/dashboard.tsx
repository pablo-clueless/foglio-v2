import { toast } from "sonner";
import React from "react";

import { useGetNotificationsQuery } from "@/api/notification";
import WebSocketService from "@/services/websocket";
import { Seo } from "../shared";
import type { NotificationProps } from "@/types";

interface Props {
  children: React.ReactNode;
  title?: string;
}

const DashboardLayout = ({ children, title }: Props) => {
  const { data: notifications, refetch } = useGetNotificationsQuery({ page: 1, size: 10 });

  const handleNotificationClick = (notification: NotificationProps) => {
    console.log({ notification });
  };

  React.useEffect(() => {
    WebSocketService.connect();
    WebSocketService.onNotification((notification) => {
      refetch();
      toast.success(notification.title, {
        action: {
          label: "View",
          onClick: () => handleNotificationClick(notification),
        },
      });
    });

    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
    return () => WebSocketService.disconnect();
  }, []);

  console.log({ notifications });

  return (
    <>
      <Seo title={title} />
      <div className="h-screen w-screen overflow-hidden">
        <div className="w-full"></div>
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
};

export default DashboardLayout;
