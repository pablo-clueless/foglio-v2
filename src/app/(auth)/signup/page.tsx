"use client";

import { RiGithubFill, RiGoogleFill, RiLoaderLine } from "@remixicon/react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { toast } from "sonner";
import Link from "next/link";
import React from "react";

import type { CreateUserDto, HttpError } from "@/types";
import { Button } from "@/components/ui/button";
import { useSignupMutation } from "@/api/auth";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/shared";

const initialValues: CreateUserDto = {
  email: "",
  name: "",
  password: "",
  username: "",
};

const Page = () => {
  const [signupMutation, { isLoading }] = useSignupMutation();
  const router = useRouter();

  const { handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: (values) => {
      signupMutation(values)
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
          <Logo />
        </Link>
      </div>
      <form className="w-full space-y-4" onSubmit={handleSubmit}>
        <Input label="Name" name="name" onChange={handleChange} type="text" />
        <Input label="Username" name="username" onChange={handleChange} type="text" />
        <Input label="Email" name="email" onChange={handleChange} type="email" />
        <Input label="Password" name="password" onChange={handleChange} type="password" />
        <Button className="w-full" type="submit">
          {isLoading ? <RiLoaderLine className="animate-spin" /> : "Create Account"}
        </Button>
      </form>
      <p className="text-sm text-gray-400">
        Have an account already?{" "}
        <Link className="link text-primary-400" href="/signin">
          Sign In
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
