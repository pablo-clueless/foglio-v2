"use client";

import { RiGithubFill, RiGoogleFill, RiLoaderLine } from "@remixicon/react";
import { motion } from "framer-motion";
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
} as const;

const Page = () => {
  const [signinMutation, { isLoading }] = useSigninMutation();
  const [remember, setRemember] = React.useState(false);
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
          signin(response.data, { remember });
          router.push("/home");
        })
        .catch((error) => {
          const message = (error as HttpError).data.message || "";
          toast.error(message);
        });
    },
  });

  return (
    <motion.div
      className="flex w-[400px] flex-col items-center gap-y-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Link href="/">
          <Logo mode="light" />
        </Link>
      </motion.div>
      <motion.form className="w-full space-y-4" onSubmit={handleSubmit} variants={itemVariants}>
        <Input label="Email" name="email" onChange={handleChange} type="email" />
        <Input label="Password" name="password" onChange={handleChange} type="password" />
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-x-2">
            <Checkbox checked={remember} onCheckedChange={(checked: boolean) => setRemember(checked)} />
            <p className="text-sm">Keep me signed in</p>
          </div>
          <Link className="text-sm underline" href="/forgot-password">
            Forgot Password
          </Link>
        </div>
        <Button aria-disabled={isLoading} disabled={isLoading} className="w-full" type="submit">
          {isLoading ? <RiLoaderLine className="animate-spin" /> : "Sign In"}
        </Button>
      </motion.form>
      <motion.p className="text-sm text-gray-400" variants={itemVariants}>
        Don&apos;t have an account?{" "}
        <Link className="link text-primary-400" href="/signup">
          Sign Up
        </Link>
      </motion.p>
      <motion.div className="flex w-full flex-col gap-5" variants={itemVariants}>
        <Button aria-disabled={isLoading} disabled={isLoading} variant="default-outline">
          <RiGoogleFill /> Continue with Google
        </Button>
        <Button aria-disabled={isLoading} disabled={isLoading} variant="default-outline">
          <RiGithubFill /> Continue with Github
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default Page;
