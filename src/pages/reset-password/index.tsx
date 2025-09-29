import Link from "next/link";
import React from "react";

import AuthLayout from "@/components/layouts/auth";
import { Button } from "@/components/ui/button";
import { Logo, Seo } from "@/components/shared";
import { Input } from "@/components/ui/input";

const Page = () => {
  return (
    <>
      <Seo title="Reset Password" />
      <AuthLayout screen="signup">
        <div className="flex flex-col items-center gap-y-10">
          <Link href="/">
            <Logo />
          </Link>
          <div className="text-center">
            <h3 className="text-2xl font-medium">Reset Password</h3>
            <p className="mt-2 text-gray-600">Enter your new password to continue.</p>
          </div>
          <form className="min-w-[400px] space-y-4">
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
