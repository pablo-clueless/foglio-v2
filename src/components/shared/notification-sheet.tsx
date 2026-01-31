"use client";

import React from "react";
import {
  RiBellLine,
  RiCheckDoubleLine,
  RiLoader4Line,
  RiMailLine,
  RiNotification3Line,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiInformationLine,
} from "@remixicon/react";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useGetNotificationsQuery } from "@/api/notification";
import type { NotificationProps } from "@/types";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib";

const PAGE_SIZE = 10;

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "APPLICATION_SUBMITTED":
      return <RiMailLine className="size-5 text-blue-400" />;
    case "APPLICATION_ACCEPTED":
      return <RiCheckboxCircleLine className="size-5 text-green-400" />;
    case "APPLICATION_REJECTED":
      return <RiCloseCircleLine className="size-5 text-red-400" />;
    case "NEW_MESSAGE":
      return <RiMailLine className="size-5 text-purple-400" />;
    case "SYSTEM":
    default:
      return <RiInformationLine className="size-5 text-gray-400" />;
  }
};

interface NotificationItemProps {
  notification: NotificationProps;
}

const NotificationItem = ({ notification }: NotificationItemProps) => {
  return (
    <div
      className={cn(
        "border-primary-100/15 flex gap-3 border-b p-4 transition-colors hover:bg-white/5",
        !notification.is_read && "bg-primary-500/5",
      )}
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10">
        {getNotificationIcon(notification.type)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className={cn("text-sm font-medium", !notification.is_read ? "text-white" : "text-gray-300")}>
            {notification.title}
          </p>
          {!notification.is_read && <span className="bg-primary-400 mt-1.5 size-2 shrink-0 rounded-full" />}
        </div>
        <p className="mt-1 line-clamp-2 text-xs text-gray-400">{notification.content}</p>
        <p className="mt-2 text-[10px] text-gray-500">
          {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
};

const EmptyState = () => (
  <div className="flex h-full flex-col items-center justify-center px-4 py-12">
    <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-white/5">
      <RiBellLine className="size-8 text-gray-500" />
    </div>
    <h3 className="text-lg font-medium text-white">No notifications</h3>
    <p className="mt-1 text-center text-sm text-gray-400">
      You&apos;re all caught up! New notifications will appear here.
    </p>
  </div>
);

const LoadingState = () => (
  <div className="flex h-full items-center justify-center">
    <RiLoader4Line className="size-8 animate-spin text-gray-400" />
  </div>
);

export const NotificationSheet = () => {
  const [page, setPage] = React.useState(1);

  const { data, isLoading, isFetching } = useGetNotificationsQuery(
    { page, size: PAGE_SIZE },
    { refetchOnFocus: true, refetchOnMountOrArgChange: true },
  );

  const notifications = data?.data?.data || [];
  const totalPages = data?.data?.total_pages || 1;
  const totalItems = data?.data?.total_items || 0;
  const hasUnread = notifications.some((n) => !n.is_read);

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="border-primary-100/15 hover:bg-primary-100/10 relative grid size-10 place-items-center border transition-colors">
          <RiNotification3Line className="size-5 text-gray-400" />
          {hasUnread && <span className="bg-primary-400 absolute top-2 right-2 size-2" />}
        </button>
      </SheetTrigger>
      <SheetContent className="flex flex-col bg-black p-0">
        <SheetHeader className="border-primary-100/15 border-b p-4">
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle className="text-white">Notifications</SheetTitle>
              <SheetDescription className="text-gray-500">
                {totalItems > 0 ? `${totalItems} notification${totalItems !== 1 ? "s" : ""}` : "No notifications"}
              </SheetDescription>
            </div>
            {notifications.length > 0 && (
              <Button variant="ghost" size="sm" className="text-xs text-gray-400 hover:text-white">
                <RiCheckDoubleLine className="mr-1 size-4" />
                Mark all read
              </Button>
            )}
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <LoadingState />
          ) : notifications.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="divide-primary-100/15 divide-y">
              {notifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="border-primary-100/15 flex items-center justify-between border-t p-4">
            <p className="text-xs text-gray-500">
              Page {page} of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevPage}
                disabled={page === 1 || isFetching}
                className="size-8 p-0"
              >
                <RiArrowLeftSLine className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={page === totalPages || isFetching}
                className="size-8 p-0"
              >
                <RiArrowRightSLine className="size-4" />
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
