"use client";

import React from "react";

import WebsocketInstance, { ConnectionState } from "@/services/websocket";
import type { NotificationProps } from "@/types";

interface WebSocketContextProps {
  clearNotifications: () => void;
  connect: () => void;
  connectionState: ConnectionState | null;
  disconnect: () => void;
  isConnected: boolean;
  markAsRead: (notificationId: string) => void;
  notifications: NotificationProps[];
}

const defaultWebsocketContextProps: WebSocketContextProps = {
  clearNotifications: () => {},
  connect: () => {},
  connectionState: null,
  disconnect: () => {},
  isConnected: false,
  markAsRead: () => {},
  notifications: [],
};

const WebSocketContext = React.createContext<WebSocketContextProps>({ ...defaultWebsocketContextProps });

interface WebSocketProviderProps extends React.PropsWithChildren {
  autoConnect?: boolean;
  maxNotifications?: number;
}

export const WebSocketProvider = ({ autoConnect, children, maxNotifications }: WebSocketProviderProps) => {
  const [connectionState, setConnectionState] = React.useState<ConnectionState | null>(null);
  const [notifications, setNotifications] = React.useState<NotificationProps[]>([]);
  const [isConnected, setIsConnected] = React.useState(false);

  const updateConnectionState = React.useCallback(() => {
    const state = WebsocketInstance.getConnectionState();
    setConnectionState(state);
    setIsConnected(state === ConnectionState.OPEN);
  }, []);

  const handleNotification = React.useCallback(
    (notification: NotificationProps) => {
      setNotifications((prev) => {
        const updated = [notification, ...prev];
        return updated.slice(0, maxNotifications);
      });
    },
    [maxNotifications],
  );

  const connect = React.useCallback(() => {
    WebsocketInstance.connect();
    updateConnectionState();
  }, [updateConnectionState]);

  const disconnect = React.useCallback(() => {
    WebsocketInstance.disconnect();
    updateConnectionState();
  }, [updateConnectionState]);

  const markAsRead = React.useCallback((notificationId: string) => {
    WebsocketInstance.markNotificationAsRead(notificationId);
    setNotifications((prev) =>
      prev.map((notif) => (notif.id?.toString() === notificationId ? { ...notif, isRead: true } : notif)),
    );
  }, []);

  const clearNotifications = React.useCallback(() => {
    setNotifications([]);
  }, []);

  React.useEffect(() => {
    const cleanup = WebsocketInstance.onNotification(handleNotification);

    if (autoConnect) {
      connect();
    }

    const intervalId = setInterval(updateConnectionState, 1000);

    return () => {
      cleanup();
      clearInterval(intervalId);
      if (autoConnect) {
        disconnect();
      }
    };
  }, [autoConnect, connect, disconnect, handleNotification, updateConnectionState]);

  React.useEffect(() => {
    const requestNotificationPermission = async () => {
      if ("Notification" in window && Notification.permission === "default") {
        await Notification.requestPermission();
      }
    };
    requestNotificationPermission();
  }, []);

  const value: WebSocketContextProps = {
    isConnected,
    connectionState,
    notifications,
    connect,
    disconnect,
    markAsRead,
    clearNotifications,
  };

  return <WebSocketContext.Provider value={value}>{children}</WebSocketContext.Provider>;
};

export const useWebSocket = (): WebSocketContextProps => {
  const ctx = React.useContext(WebSocketContext);

  if (!ctx) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }

  return ctx;
};
