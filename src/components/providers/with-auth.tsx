"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import React from "react";

import { COOKIE_NAME } from "@/api/store/auth";
import { Loader } from "@/components/shared";

interface WithAuthProps {
  children: React.ReactNode;
  redirectTo?: string;
  fallback?: React.ReactNode;
}

export const WithAuth = React.memo(({ children, fallback = <Loader />, redirectTo = "/signin" }: WithAuthProps) => {
  const router = useRouter();

  const token = Cookies.get(COOKIE_NAME);
  const hasAccess = !!token;

  React.useEffect(() => {
    if (!hasAccess) {
      router.push(redirectTo);
    }
  }, [hasAccess, router, redirectTo]);

  return hasAccess ? <>{children}</> : <>{fallback}</>;
});

WithAuth.displayName = "WithAuth";
