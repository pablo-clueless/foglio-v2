"use client";

import { RiGithubFill, RiGoogleFill, RiLoaderLine } from "@remixicon/react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { toast } from "sonner";
import Link from "next/link";
import React from "react";

import type { HttpError, SigninDto } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useSigninMutation } from "@/api/auth";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/user";
import { Logo } from "@/components/shared";

const initialValues: SigninDto = {
  email: "",
  password: "",
};

const Page = () => {
  const [signinMutation, { isLoading }] = useSigninMutation();
  const { signin } = useUserStore();
  const router = useRouter();

  const { handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: (values) => {
      signinMutation(values)
        .unwrap()
        .then((response) => {
          const message = response.message || "";
          toast.success(message);
          signin(response.data, { remember: true });
          router.push("/home");
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
        <Input label="Password" name="password" onChange={handleChange} type="password" />
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-x-2">
            <Checkbox />
            <p className="text-sm">Keep me signed in</p>
          </div>
          <Link className="text-sm underline" href="/forgot-password">
            Forgot Password
          </Link>
        </div>
        <Button className="w-full" type="submit">
          {isLoading ? <RiLoaderLine className="animate-spin" /> : "Sign In"}
        </Button>
      </form>
      <p className="text-sm text-gray-400">
        Don&apos;t have an account?{" "}
        <Link className="link text-primary-400" href="/signup">
          Sign Up
        </Link>
      </p>
      <div className="flex w-full flex-col gap-5">
        <Button variant="default-outline">
          <RiGoogleFill /> Continue with Google
        </Button>
        <Button variant="default-outline">
          <RiGithubFill /> Continue with Github
        </Button>
      </div>
    </div>
  );
};

export default Page;
