"use client";

import { RiLoaderLine } from "@remixicon/react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { toast } from "sonner";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { useForgotPasswordMutation } from "@/api/auth";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/shared";
import type { HttpError } from "@/types";

const Page = () => {
  const [forgotPasswordMutation, { isLoading }] = useForgotPasswordMutation();
  const router = useRouter();

  const { handleChange, handleSubmit } = useFormik({
    initialValues: { email: "" },
    onSubmit: (values) => {
      forgotPasswordMutation(values.email)
        .unwrap()
        .then((response) => {
          const message = response.message || "";
          toast.success(message);
          router.push("/reset-password");
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
        <Input label="Email" name="email" onChange={handleChange} type="email" />
        <Button className="w-full" type="submit">
          {isLoading ? <RiLoaderLine className="animate-spin" /> : "Sign In"}
        </Button>
      </form>
    </div>
  );
};

export default Page;
