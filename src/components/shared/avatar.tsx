import { RiEdit2Line, RiUploadCloud2Line } from "@remixicon/react";
import Image from "next/image";
import { toast } from "sonner";
import React from "react";

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useUpdateUserImageMutation } from "@/api/user";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/user";
import { useFileHandler } from "@/hooks";
import type { HttpError } from "@/types";
import { cn } from "@/lib";

interface Props {
  alt: string;
  className?: string;
  editable?: boolean;
  src?: string;
}

export const Avatar = ({ alt, className, editable = false, src }: Props) => {
  const [preview, setPreview] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);
  const { user } = useUserStore();

  const [updateUserImage, { isLoading }] = useUpdateUserImageMutation();

  const {
    files,
    handleClick,
    handleFileChange,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    inputRef,
    isDragging,
    clearFiles,
  } = useFileHandler({
    onValueChange: (files) => {
      if (files.length > 0) {
        const url = URL.createObjectURL(files[0]);
        setPreview(url);
      } else {
        setPreview(null);
      }
    },
    onError: (error) => toast.error(error),
    validationRules: {
      maxSize: 5 * 1024 * 1024,
      maxFiles: 1,
    },
    fileType: "image",
    append: false,
  });

  const handleUpload = async () => {
    if (!user || files.length === 0) return;
    try {
      await updateUserImage({ id: user.id, avatar: files[0] }).unwrap();
      toast.success("Avatar updated successfully");
      handleClose();
    } catch (error) {
      const message = (error as HttpError).data.message || "Error uploading image";
      toast.error(message);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setPreview(null);
    clearFiles();
  };

  return (
    <div className={cn("border-primary-100/15 relative grid size-10 place-items-center border", className)}>
      {src ? (
        <div className="relative size-full">
          <Image alt={alt} fill sizes="100%" src={src} />
        </div>
      ) : (
        <span>{alt}</span>
      )}
      {editable && (
        <Dialog open={open} onOpenChange={(isOpen) => (isOpen ? setOpen(true) : handleClose())}>
          <DialogTrigger asChild>
            <button className="border-primary-100/25 absolute -right-2 -bottom-2 grid size-5 place-items-center rounded-full border bg-white">
              <RiEdit2Line className="size-3" />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Update Avatar</DialogTitle>
            <DialogDescription>Upload a new profile picture. Max file size is 5MB.</DialogDescription>
            <div
              onClick={handleClick}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={cn(
                "mt-4 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-white/20 p-8 transition-colors",
                isDragging && "border-primary-400 bg-primary-400/10",
                preview && "border-solid",
              )}
            >
              {preview ? (
                <div className="relative size-32 overflow-hidden rounded-full">
                  <Image alt="Preview" fill sizes="128px" src={preview} className="object-cover" />
                </div>
              ) : (
                <>
                  <RiUploadCloud2Line className="size-10 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-400">Click or drag and drop to upload</p>
                  <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                </>
              )}
              <input ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" onClick={handleClose} disabled={isLoading}>
                Cancel
              </Button>
              <Button onClick={handleUpload} disabled={!files.length || isLoading}>
                {isLoading ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
