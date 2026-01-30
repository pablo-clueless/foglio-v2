import React from "react";

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const AddPaymentMethod = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog onOpenChange={(open) => setOpen(open)} open={open}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="mt-4">
          + Add Payment Method
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div>
          <DialogTitle>Add Payment Method</DialogTitle>
          <DialogDescription></DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
};
