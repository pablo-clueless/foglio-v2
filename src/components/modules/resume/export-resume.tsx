import { useFormik } from "formik";
import React from "react";

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { FONTFACES, THEMES } from "@/config/theme";
import { Button } from "@/components/ui/button";

const initialValues = {
  fontface: "",
  theme: "",
};

export const ExportResume = () => {
  const [open, setOpen] = React.useState(false);

  const { setFieldValue, values } = useFormik({
    initialValues,
    onSubmit: () => {},
  });

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button size="sm">Export Resume</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[850px]">
        <div className="flex w-full items-center justify-between">
          <div className="">
            <DialogTitle>Export Resume</DialogTitle>
            <DialogDescription>Export Resume</DialogDescription>
          </div>
        </div>
        <div className="grid w-full grid-cols-3 gap-4">
          <div className="col-span-2 aspect-[1/1.414] border p-1"></div>
          <div className="space-y-4 text-black">
            <div className="space-y-1">
              <p className="text-sm font-semibold">Choose Style</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold">Choose Theme</p>
              <div className="space-y-1">
                {THEMES.map((theme, index) => (
                  <div className="flex items-center gap-x-2" key={index}>
                    <Checkbox
                      checked={values.theme === theme.name}
                      onCheckedChange={() => setFieldValue("theme", theme.name)}
                    />
                    <p className="text-sm">{theme.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold">Choose Fontface</p>
              <div className="space-y-1">
                {FONTFACES.map((fontface, index) => (
                  <div className="flex items-center gap-x-2" key={index}>
                    <Checkbox
                      checked={values.fontface === fontface.value}
                      onCheckedChange={() => setFieldValue("fontface", fontface.value)}
                    />
                    <p className="text-sm">{fontface.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
