"use client";

import { RiLoaderLine } from "@remixicon/react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { toast } from "sonner";
import Link from "next/link";
import React from "react";

import type { HttpError, ResetPasswordDto } from "@/types";
import { Button } from "@/components/ui/button";
import { useResetPasswordMutation } from "@/api/auth";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/shared";

const initialValues: ResetPasswordDto = {
  confirmPassword: "",
  newPassword: "",
  token: "",
};

const Page = () => {
  const [resetPasswordMutation, { isLoading }] = useResetPasswordMutation();
  const router = useRouter();

  const { handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: (values) => {
      resetPasswordMutation(values)
        .unwrap()
        .then((response) => {
          const message = response.message || "";
          toast.success(message);
          router.push("/signin");
        })
        .catch((error) => {
          const message = (error as HttpError).data.message || "";
          toast.error(message);
        });
    },
  });

  return (
    <div className="flex w-[400px] flex-col items-center gap-y-20">
      <div className="">
        <Link href="/">
          <Logo mode="light" />
        </Link>
      </div>
      <form className="w-full space-y-4" onSubmit={handleSubmit}>
        <Input label="New Password" name="newPassword" onChange={handleChange} type="password" />
        <Input label="Confirm Password" name="confirmPassword" onChange={handleChange} type="password" />
        <Button className="w-full" type="submit">
          {isLoading ? <RiLoaderLine className="animate-spin" /> : "Sign In"}
        </Button>
      </form>
    </div>
  );
};

export default Page;
