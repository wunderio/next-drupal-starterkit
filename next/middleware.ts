import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "./auth";
import { i18nConfig } from "./i18n";

interface AppRouteHandlerFnContext {
  params?: Record<string, string | string[]>;
}

const intlMiddleware = createMiddleware({
  locales: i18nConfig.locales,
  defaultLocale: i18nConfig.defaultLocale,
  localePrefix: "as-needed",
  alternateLinks: false,
});

const authMiddleware = (request: NextRequest, ctx: AppRouteHandlerFnContext) =>
  auth((req) => {
    // Redirects here example:
    /*
    const isLoggedIn = req.auth?.user;

 
    const isProtectedRoute = ["/dashboard", "/whatever"].some((route) =>
      req.nextUrl.pathname.startsWith(route),
    );

    if (isProtectedRoute) {
      if (!isLoggedIn) {
        return NextResponse.redirect(
          new URL(
            `${DEFAULT_LOGIN_URL}?logout=true&callbackUrl=${encodeURIComponent(req.nextUrl.pathname)}`,
            req.nextUrl,
          ),
        );
      }
    }
    */
    return intlMiddleware(request);
  })(request, ctx);

export const middleware = (
  request: NextRequest,
  ctx: AppRouteHandlerFnContext,
): NextResponse => {
  return authMiddleware(request, ctx) as NextResponse;
};

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
