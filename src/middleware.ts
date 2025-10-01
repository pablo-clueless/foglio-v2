import type { NextURL } from "next/dist/server/web/next-url";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/me", "/signin", "/signup"],
  name: "auth-middleware",
};

export function middleware(req: NextRequest) {
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-next-pathname", req.nextUrl.pathname);
  const hasToken = req.cookies.has("FOGLIO_TOKEN");
  const url = req.nextUrl.clone();

  const redirectResponse = (url: string | NextURL) => {
    const response = NextResponse.redirect(url);
    response.headers.set("x-middleware-cache", "no-cache"); // !FIX: Disable caching
    return response;
  };

  if (hasToken && (url.pathname === "/signin" || url.pathname === "/signup")) {
    url.pathname = "/me";
    return redirectResponse(url);
  }

  if (!hasToken && url.pathname === "/me") {
    url.pathname = "/signin";
    return redirectResponse(url);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
