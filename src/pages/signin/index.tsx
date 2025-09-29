import Link from "next/link";
import React from "react";

import AuthLayout from "@/components/layouts/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Seo } from "@/components/shared";

const Page = () => {
  return (
    <>
      <Seo title="Welcome Back" />
      <AuthLayout screen="signin">
        <div className="flex flex-col items-center gap-y-10">
          <Link className="font-nunito-sans text-4xl font-bold" href="/">
            Foglio
          </Link>
          <div className="text-center">
            <h3 className="text-2xl font-medium">Sign In</h3>
            <p className="mt-2 text-gray-600">Welcome back! Sign in in to Foglio.</p>
          </div>
          <form className="min-w-[400px] space-y-4">
            <Input label="Email" type="email" />
            <div className="w-full space-y-2">
              <Input label="Password" type="password" />
              <div className="flex w-full items-center justify-between">
                <Link className="link text-sm" href="/forgot-password">
                  Forgot Password?
                </Link>
              </div>
            </div>
            <Button className="w-full" size="sm" type="submit">
              Sign In
            </Button>
          </form>
          <p className="text-sm">
            Don&apos;t have an account?{" "}
            <Link className="link" href="/signup">
              Sign up
            </Link>
          </p>
        </div>
      </AuthLayout>
    </>
  );
};

export default Page;
