import type { NotificationProps } from "@/types";

const WS_URL = process.env.NEXT_PUBLIC_WSS_URI as string;

export enum ConnectionState {
  CONNECTING = 0,
  OPEN = 1,
  CLOSING = 2,
  CLOSED = 3,
}

interface WebSocketMessage {
  action: string;
  notification_id?: string;
  [key: string]: unknown;
}

type NotificationCallback = (data: NotificationProps) => void;
type CleanupFunction = () => void;

class WebSocketService {
  private socket: WebSocket | null = null;
  private reconnectAttempts = 0;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private callbacks = new Set<NotificationCallback>();
  private messageQueue: WebSocketMessage[] = [];
  private isIntentionallyClosed = false;

  private readonly MAX_RECONNECT_ATTEMPTS = 5;
  private readonly BASE_RECONNECT_DELAY = 1000;
  private readonly MAX_RECONNECT_DELAY = 30000;
  private readonly HEARTBEAT_INTERVAL = 30000;

  connect(): void {
    if (this.socket?.readyState === ConnectionState.OPEN) {
      console.warn("WebSocket already connected");
      return;
    }

    if (!WS_URL) {
      console.error("WebSocket URL not configured");
      return;
    }

    this.isIntentionallyClosed = false;
    this.createSocket();
  }

  private createSocket(): void {
    try {
      this.socket = new WebSocket(WS_URL);
      this.setupEventHandlers();
    } catch (error) {
      console.error("Failed to create WebSocket:", error);
      this.scheduleReconnect();
    }
  }

  private setupEventHandlers(): void {
    if (!this.socket) return;

    this.socket.onopen = this.handleOpen.bind(this);
    this.socket.onmessage = this.handleMessage.bind(this);
    this.socket.onclose = this.handleClose.bind(this);
    this.socket.onerror = this.handleError.bind(this);
  }

  private handleOpen(): void {
    console.log("WebSocket connected");
    this.reconnectAttempts = 0;
    this.startHeartbeat();
    this.flushMessageQueue();
  }

  private handleMessage(event: MessageEvent): void {
    try {
      const notification: NotificationProps = JSON.parse(event.data);
      this.notifyCallbacks(notification);
      this.showBrowserNotification(notification);
    } catch (error) {
      console.error("Failed to parse WebSocket message:", error);
    }
  }

  private handleClose(event: CloseEvent): void {
    console.log(`WebSocket disconnected: ${event.code} - ${event.reason}`);
    this.stopHeartbeat();

    if (!this.isIntentionallyClosed) {
      this.scheduleReconnect();
    }
  }

  private handleError(error: Event): void {
    console.error("WebSocket error:", error);
  }

  private notifyCallbacks(notification: NotificationProps): void {
    this.callbacks.forEach((callback) => {
      try {
        callback(notification);
      } catch (error) {
        console.error("Error in notification callback:", error);
      }
    });
  }

  private showBrowserNotification(notification: NotificationProps): void {
    if (Notification.permission === "granted") {
      new Notification(notification.title, {
        body: notification.content,
        icon: "/favicon.ico",
        tag: notification.id?.toString(),
        requireInteraction: false,
      });
    }
  }

  onNotification(callback: NotificationCallback): CleanupFunction {
    this.callbacks.add(callback);
    return () => this.callbacks.delete(callback);
  }

  send(message: WebSocketMessage): void {
    if (this.socket?.readyState === ConnectionState.OPEN) {
      try {
        this.socket.send(JSON.stringify(message));
      } catch (error) {
        console.error("Failed to send WebSocket message:", error);
        this.messageQueue.push(message);
      }
    } else {
      this.messageQueue.push(message);
    }
  }

  markAsRead(notificationId: string): void {
    this.send({
      action: "mark_read",
      notification_id: notificationId,
    });
  }

  private flushMessageQueue(): void {
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();
      if (message) {
        this.send(message);
      }
    }
  }

  private scheduleReconnect(): void {
    if (this.reconnectAttempts >= this.MAX_RECONNECT_ATTEMPTS) {
      console.error("Max reconnection attempts reached");
      return;
    }

    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }

    const delay = Math.min(this.BASE_RECONNECT_DELAY * Math.pow(2, this.reconnectAttempts), this.MAX_RECONNECT_DELAY);

    this.reconnectAttempts++;
    console.log(`Reconnecting in ${delay}ms... (${this.reconnectAttempts}/${this.MAX_RECONNECT_ATTEMPTS})`);

    this.reconnectTimeout = setTimeout(() => {
      this.connect();
    }, delay);
  }

  private startHeartbeat(): void {
    this.stopHeartbeat();
    this.heartbeatInterval = setInterval(() => {
      this.send({ action: "ping" });
    }, this.HEARTBEAT_INTERVAL);
  }

  private stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  disconnect(): void {
    this.isIntentionallyClosed = true;
    this.stopHeartbeat();

    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.socket) {
      this.socket.close(1000, "Client disconnecting");
      this.socket = null;
    }

    this.callbacks.clear();
    this.messageQueue = [];
    this.reconnectAttempts = 0;
  }

  getConnectionState(): ConnectionState | null {
    return this.socket?.readyState ?? null;
  }

  isConnected(): boolean {
    return this.socket?.readyState === ConnectionState.OPEN;
  }
}

const WebSocketInstance = new WebSocketService();

if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    WebSocketInstance.disconnect();
  });
}

export default WebSocketInstance;
