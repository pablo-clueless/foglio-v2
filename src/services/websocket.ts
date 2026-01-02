import type { NotificationProps } from "@/types";

const WS_URL = process.env.NEXT_PUBLIC_WS_URI as string;

class WebSocketService {
  private socket: WebSocket | null;
  private reconnectAttempts: number;
  private maxReconnectAttempts: number;
  private onNotificationCallbacks: ((data: NotificationProps) => void)[];

  constructor() {
    this.socket = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.onNotificationCallbacks = [];
  }

  connect(): void {
    this.socket = new WebSocket(WS_URL);

    this.socket.onopen = (): void => {
      console.log("WebSocket connected");
      this.reconnectAttempts = 0;
    };

    this.socket.onmessage = (event: MessageEvent): void => {
      const notification: NotificationProps = JSON.parse(event.data);
      this.handleNotification(notification);
    };

    this.socket.onclose = (): void => {
      console.log("WebSocket disconnected");
      this.attemptReconnect();
    };

    this.socket.onerror = (error: Event): void => {
      console.error("WebSocket error:", error);
    };
  }

  handleNotification(notification: NotificationProps) {
    console.log("New notification:", notification);

    this.onNotificationCallbacks.forEach((callback) => {
      callback(notification);
    });

    if (Notification.permission === "granted") {
      new Notification(notification.title, {
        body: notification.content,
        icon: "/favicon.ico",
      });
    }
  }

  onNotification(callback: (data: NotificationProps) => void) {
    this.onNotificationCallbacks.push(callback);
  }

  markAsRead(notificationId: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(
        JSON.stringify({
          action: "mark_read",
          notification_id: notificationId,
        }),
      );
    }
  }

  attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        this.connect();
      }, 3000 * this.reconnectAttempts);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

const WebSocketInstance = new WebSocketService();
export default WebSocketInstance;
