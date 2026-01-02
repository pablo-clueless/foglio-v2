"use client";

import { SignOutIcon } from "@phosphor-icons/react";
import React from "react";

import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/user";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const Logout = () => {
  const [open, setOpen] = React.useState(false);
  const { signout } = useUserStore();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="grid size-8 place-items-center text-red-500">
          <SignOutIcon className="size-5" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Logout</DialogTitle>
        <DialogDescription>Are you sure you want to logout?</DialogDescription>
        <div className="flex w-full items-center justify-end gap-x-4">
          <Button onClick={() => setOpen(false)} size="sm" variant="outline">
            Cancel
          </Button>
          <Button onClick={() => signout()} size="sm" variant="destructive-outline">
            Logout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
