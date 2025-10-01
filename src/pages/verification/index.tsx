import Link from "next/link";
import React from "react";

import AuthLayout from "@/components/layouts/auth";
import { Button } from "@/components/ui/button";
import { Logo, Seo } from "@/components/shared";
import { Input } from "@/components/ui/input";

const Page = () => {
  return (
    <>
      <Seo title="Verification" />
      <AuthLayout screen="signup">
        <div className="flex flex-col items-center gap-y-10">
          <Link href="/">
            <Logo />
          </Link>
          <div className="text-center">
            <h3 className="text-2xl font-medium">Verify your Account</h3>
            <p className="mt-2 text-gray-600">
              We sent a verification code to your email. Please enter it below to continue.
            </p>
          </div>
          <form autoComplete="off" className="min-w-[400px] space-y-4">
            <Input type="password" />
            <Input type="password" />
            <Button className="w-full" size="sm" type="submit">
              Continue
            </Button>
          </form>
        </div>
      </AuthLayout>
    </>
  );
};

export default Page;
