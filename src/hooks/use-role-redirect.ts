"use client";

import { useRouter } from "next/navigation";
import React from "react";

import type { UserProps } from "@/types";

export const useRoleRedirect = (user: UserProps) => {
  const router = useRouter();

  return React.useCallback(() => {
    switch (true) {
      case user.is_admin:
        router.push("/admin");
        return;
      case user.is_recruiter:
        router.push("/home");
        return;
      default:
        router.push("/home");
        return;
    }
  }, [router, user]);
};
