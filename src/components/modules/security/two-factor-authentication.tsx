import React from "react";

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const TwoFactorAuthentication = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm"></Button>
      </DialogTrigger>
      <DialogContent className="rounded-none">
        <div>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
};
