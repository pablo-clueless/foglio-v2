"use client";

import { RiGithubFill, RiGoogleFill, RiLoaderLine, RiShieldKeyholeLine } from "@remixicon/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import { toast } from "sonner";
import Link from "next/link";
import React from "react";

import { useLazyGithubQuery, useLazyGoogleQuery, useSigninMutation, useVerifyTwoFactorMutation } from "@/api/auth";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { HttpError, SigninDto } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/user";
import { Logo } from "@/components/shared";

const initialValues: SigninDto = {
  identifier: "",
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
  const [verifyTwoFactor, { isLoading: isVerifying2FA }] = useVerifyTwoFactorMutation();
  const [remember, setRemember] = React.useState(false);
  const [show2FADialog, setShow2FADialog] = React.useState(false);
  const [twoFactorCode, setTwoFactorCode] = React.useState("");
  const [pendingUserId, setPendingUserId] = React.useState<string | null>(null);
  const { signin } = useUserStore();
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

  const handle2FAVerification = async () => {
    if (!pendingUserId || twoFactorCode.length !== 6) {
      toast.error("Please enter a valid 6-digit code");
      return;
    }

    try {
      const response = await verifyTwoFactor({ user_id: pendingUserId, code: twoFactorCode }).unwrap();
      signin(response.data, { remember });
      setShow2FADialog(false);
      setTwoFactorCode("");
      setPendingUserId(null);

      if (response.data.user.is_admin) {
        router.push("/admin");
      } else {
        router.push("/home");
      }
      toast.success("Successfully signed in");
    } catch (error) {
      const message = (error as HttpError).data?.message || "Invalid verification code";
      toast.error(message);
    }
  };

  const { handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: (values) => {
      signinMutation(values)
        .unwrap()
        .then((response) => {
          const message = response.message || "";
          if (!response.data.requires_two_factor) {
            signin(response.data, { remember });
            if (response.data.user.is_admin) {
              router.push("/admin");
              toast.success(message);
            } else {
              router.push("/home");
              toast.success(message);
            }
          } else {
            setPendingUserId(response.data.user_id || "");
            setShow2FADialog(true);
            toast.info("Please enter your 2FA code");
          }
        })
        .catch((error) => {
          const message = (error as HttpError).data.message || "";
          toast.error(message);
        });
    },
  });

  return (
    <>
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
          <Input label="Email/Username" name="identifier" onChange={handleChange} type="text" />
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
      <Dialog open={show2FADialog} onOpenChange={setShow2FADialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <RiShieldKeyholeLine className="text-primary-500 size-5" />
              Two-Factor Authentication
            </DialogTitle>
            <DialogDescription>
              Enter the 6-digit code from your authenticator app to complete sign in.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              label="Verification Code"
              placeholder="000000"
              value={twoFactorCode}
              onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              maxLength={6}
              className="text-center text-lg tracking-widest text-black"
            />
            <p className="text-center text-sm text-gray-500">
              Open your authenticator app and enter the code shown for your account.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShow2FADialog(false);
                setTwoFactorCode("");
                setPendingUserId(null);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handle2FAVerification} disabled={isVerifying2FA || twoFactorCode.length !== 6}>
              {isVerifying2FA ? <RiLoaderLine className="mr-2 size-4 animate-spin" /> : null}
              Verify
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Page;
