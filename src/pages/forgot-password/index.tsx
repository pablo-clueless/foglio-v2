import Link from "next/link";
import React from "react";

import AuthLayout from "@/components/layouts/auth";
import { Button } from "@/components/ui/button";
import { Logo, Seo } from "@/components/shared";
import { Input } from "@/components/ui/input";

const Page = () => {
  return (
    <>
      <Seo title="Forgot Password" />
      <AuthLayout screen="signup">
        <div className="flex flex-col items-center gap-y-10">
          <Link href="/">
            <Logo />
          </Link>
          <div className="text-center">
            <h3 className="text-2xl font-medium">Forgot Password</h3>
            <p className="mt-2 text-gray-600">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
          </div>
          <form className="min-w-[400px] space-y-4">
            <Input label="Email" type="email" />
            <Button className="w-full" size="sm" type="submit">
              Continue
            </Button>
          </form>
          <Link className="link text-sm" href="/signin">
            Back to signin
          </Link>
        </div>
      </AuthLayout>
    </>
  );
};

export default Page;
