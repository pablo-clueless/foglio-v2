import type { NextURL } from "next/dist/server/web/next-url";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { COOKIE_NAME } from "@/api/store/auth";

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api).*)",
  ],
};

// Protected route prefixes that require authentication
const protectedPrefixes = ["/admin", "/home", "/applications", "/settings", "/resume"];

const isProtectedPath = (pathname: string): boolean => {
  return protectedPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
};

const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN || "foglio-v2.vercel.app";

const getSubdomain = (host: string): string | null => {
  const hostWithoutPort = host.split(":")[0];
  if (hostWithoutPort === BASE_DOMAIN || hostWithoutPort === `www.${BASE_DOMAIN}`) {
    return null;
  }
  if (hostWithoutPort.endsWith(`.${BASE_DOMAIN}`)) {
    const subdomain = hostWithoutPort.replace(`.${BASE_DOMAIN}`, "");
    if (subdomain === "www") {
      return null;
    }
    return subdomain;
  }

  return null;
};

const isCustomDomain = (host: string): boolean => {
  const hostWithoutPort = host.split(":")[0];
  return !hostWithoutPort.includes(BASE_DOMAIN) && !hostWithoutPort.includes("localhost");
};

export function middleware(req: NextRequest) {
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-next-pathname", req.nextUrl.pathname);

  const host = req.headers.get("host") || "";
  const subdomain = getSubdomain(host);
  const customDomain = isCustomDomain(host);
  const url = req.nextUrl.clone();

  const redirectResponse = (url: string | NextURL) => {
    const response = NextResponse.redirect(url);
    response.headers.set("x-middleware-cache", "no-cache");
    return response;
  };

  if (subdomain) {
    requestHeaders.set("x-subdomain", subdomain);
    url.pathname = `/portfolio/${subdomain}${url.pathname === "/" ? "" : url.pathname}`;
    return NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    });
  }

  if (customDomain) {
    const domainHost = host.split(":")[0];
    requestHeaders.set("x-custom-domain", domainHost);
    url.pathname = `/portfolio/_domain/${domainHost}${url.pathname === "/" ? "" : url.pathname}`;
    return NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    });
  }

  const hasToken = req.cookies.has(COOKIE_NAME);

  // Only require auth for protected routes (admin and dashboard)
  if (!hasToken && isProtectedPath(url.pathname)) {
    url.pathname = "/signin";
    return redirectResponse(url);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
