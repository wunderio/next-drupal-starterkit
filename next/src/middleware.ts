import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { auth } from "./auth";
import { routing } from "./routing";

const DEFAULT_LOGIN_URL = "/auth/login";

// Auth routes & protected routes
// Add more routes as needed.
// For now need to add the internationalized routes too 😁
const PROTECTED_ROUTES = [
  "/dashboard",
  "/fi/hallintapaneeli",
  "/sv/instrumentpanel",
];
const AUTH_ROUTES = [
  "/login",
  "/register",
  "/fi/kirjaudu",
  "/fi/rekisteröidy",
  "/sv/logga-in",
  "/sv/registrera",
];

interface AppRouteHandlerFnContext {
  params?: Record<string, string | string[]>;
}

const intlMiddleware = createMiddleware(routing, {
  alternateLinks: false,
});

const authMiddleware = (request: NextRequest, ctx: AppRouteHandlerFnContext) =>
  auth((req) => {
    const isLoggedIn = req.auth?.user;
    const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
      req.nextUrl.pathname.startsWith(route),
    );
    const isAuthRoute = AUTH_ROUTES.some((route) =>
      req.nextUrl.pathname.startsWith(route),
    );

    // Redirect to default login page with requested URL as callbackUrl if accessing a protected route
    // without being logged in
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

    // Redirect to frontpage if accessing an auth route while being logged in
    if (isAuthRoute) {
      if (isLoggedIn) {
        return NextResponse.redirect(new URL("/", req.nextUrl));
      }
    }

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
