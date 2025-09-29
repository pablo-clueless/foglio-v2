import Link from "next/link";
import React from "react";

import AuthLayout from "@/components/layouts/auth";
import { Button } from "@/components/ui/button";
import { Logo, Seo } from "@/components/shared";
import { Input } from "@/components/ui/input";

const Page = () => {
  return (
    <>
      <Seo title="Create Account" />
      <AuthLayout screen="signup">
        <div className="flex flex-col items-center gap-y-10">
          <Link href="/">
            <Logo />
          </Link>
          <div className="text-center">
            <h3 className="text-2xl font-medium">Create Account</h3>
            <p className="mt-2 text-gray-600">Welcome to Foglio! Sign up to being to use Foglio.</p>
          </div>
          <form className="min-w-[400px] space-y-4">
            <Input label="Name" />
            <Input label="Email" type="email" />
            <Input label="Password" type="password" />
            <Button className="w-full" size="sm" type="submit">
              Sign Up
            </Button>
          </form>
          <p className="text-sm">
            Already have an account?{" "}
            <Link className="link" href="/signin">
              Sign In
            </Link>
          </p>
        </div>
      </AuthLayout>
    </>
  );
};

export default Page;
