import type { NextURL } from "next/dist/server/web/next-url";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { COOKIE_NAME } from "@/api/store/auth";

export const config = {
  matcher: ["/(dashboard)/:path*", "/admin/:path*", "/(auth)/:path*"],
  name: "auth-middleware",
};

const publicEntries = [
  "/",
  "/forgot-password",
  "/jobs",
  "/reset-password",
  "/recruiters",
  "/privacy-policy",
  "/signin",
  "/signup",
  "/talents",
  "/terms-of-service",
];

export function middleware(req: NextRequest) {
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-next-pathname", req.nextUrl.pathname);
  const hasToken = req.cookies.has(COOKIE_NAME);
  const url = req.nextUrl.clone();

  const redirectResponse = (url: string | NextURL) => {
    const response = NextResponse.redirect(url);
    response.headers.set("x-middleware-cache", "no-cache"); // !FIX: Disable caching
    return response;
  };

  if (hasToken && publicEntries.includes(url.pathname)) {
    url.pathname = "/home";
    return redirectResponse(url);
  }

  if (!hasToken && !publicEntries.includes(url.pathname)) {
    url.pathname = "/signin";
    return redirectResponse(url);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
