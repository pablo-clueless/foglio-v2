"use client";

import { RiGithubFill, RiGoogleFill, RiLoaderLine } from "@remixicon/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import { toast } from "sonner";
import Link from "next/link";
import React from "react";

import { useLazyGithubQuery, useLazyGoogleQuery, useSignupMutation } from "@/api/auth";
import type { CreateUserDto, HttpError } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/shared";

const initialValues: CreateUserDto = {
  email: "",
  name: "",
  password: "",
  username: "",
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
  const [signupMutation, { isLoading }] = useSignupMutation();
  const router = useRouter();

  const [triggerGithub, { isLoading: isLoadingGithub }] = useLazyGithubQuery();
  const [triggerGoogle, { isLoading: isLoadingGoogle }] = useLazyGoogleQuery();

  const handleGithubLogin = async () => {
    const result = await triggerGithub(null);
    if (result.data?.data) {
      window.open(result.data.data, "_blank");
    }
  };

  const handleGoogleLogin = async () => {
    const result = await triggerGoogle(null);
    if (result.data?.data) {
      window.open(result.data.data, "_blank");
    }
  };

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
    <motion.div
      className="flex w-[300px] flex-col items-center gap-y-20 sm:w-[400px]"
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
        <Input label="Name" name="name" onChange={handleChange} type="text" />
        <Input label="Username" name="username" onChange={handleChange} type="text" />
        <Input label="Email" name="email" onChange={handleChange} type="email" />
        <Input label="Password" name="password" onChange={handleChange} type="password" />
        <Button disabled={isLoading} className="w-full" type="submit">
          {isLoading ? <RiLoaderLine className="animate-spin" /> : "Create Account"}
        </Button>
      </motion.form>
      <motion.p className="text-sm text-gray-400" variants={itemVariants}>
        Have an account already?{" "}
        <Link className="link text-primary-400" href="/signin">
          Sign In
        </Link>
      </motion.p>
      <motion.div className="flex w-full flex-col gap-5" variants={itemVariants}>
        <Button
          // aria-disabled={isLoadingGoogle}
          // disabled={isLoadingGoogle}
          aria-disabled={true}
          disabled={true}
          variant="default-outline"
          onClick={handleGoogleLogin}
        >
          {isLoadingGoogle ? <RiLoaderLine className="animate-spin" /> : <RiGoogleFill />} Continue with Google
        </Button>
        <Button
          // aria-disabled={isLoadingGithub}
          // disabled={isLoadingGithub}
          aria-disabled={true}
          disabled={true}
          variant="default-outline"
          onClick={handleGithubLogin}
        >
          {isLoadingGithub ? <RiLoaderLine className="animate-spin" /> : <RiGithubFill />} Continue with Github
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default Page;
