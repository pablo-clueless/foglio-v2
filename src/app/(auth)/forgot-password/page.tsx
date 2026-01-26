"use client";

import { RiLoaderLine } from "@remixicon/react";
import { motion } from "framer-motion";
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
        <Button className="w-full" type="submit">
          {isLoading ? <RiLoaderLine className="animate-spin" /> : "Send Reset Link"}
        </Button>
      </motion.form>
    </motion.div>
  );
};

export default Page;
