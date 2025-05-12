import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { fetchNodeByPathQuery } from "@/lib/drupal/get-node-nocache";
import { extractRedirectFromRouteQueryResult } from "@/lib/graphql/utils";

import { routing } from "./i18n/routing";
import { auth, DEFAULT_LOGIN_REDIRECT_URL, DEFAULT_LOGIN_URL } from "./auth";

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

// Handle redirects from Drupal
async function handleDrupalRedirects(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  console.log("Handling Drupal redirects for path:", pathname);

  // We need to check if the path includes a locale.
  // Get the default locale from the routing configuration
  const defaultLocale = routing.defaultLocale;
  const pathnameSegments = pathname.split("/").filter(Boolean);

  // Handle locale determination
  let locale;
  let slugSegments;

  if (pathnameSegments.length === 0) {
    // Root path - use default locale
    locale = defaultLocale;
    slugSegments = [];
  } else {
    // Check if first segment is a valid locale
    const firstSegment = pathnameSegments[0];
    const isLocale = routing.locales.includes(
      firstSegment as (typeof routing.locales)[number],
    );

    if (isLocale) {
      // Path includes locale: /en/about
      locale = firstSegment;
      slugSegments = pathnameSegments.slice(1);
    } else {
      // Path doesn't include locale: /about
      // Assume default locale
      locale = defaultLocale;
      slugSegments = pathnameSegments;
    }
  }

  // If there are no slug segments, it's likely the homepage
  if (slugSegments.length === 0) {
    return null;
  }

  // Construct path for query
  const path = "/" + slugSegments.join("/");
  console.log("Constructed path for query:", path);
  console.log("Locale for query:", locale);

  try {
    // Check if this path should redirect
    const nodeByPathResult = await fetchNodeByPathQuery(path, locale, false);
    const redirectResult =
      extractRedirectFromRouteQueryResult(nodeByPathResult);

    if (redirectResult) {
      // Apply the appropriate redirect
      const status =
        redirectResult.status === 307 || redirectResult.status === 302
          ? redirectResult.status
          : 308; // Permanent redirect

      return NextResponse.redirect(
        new URL(redirectResult.url, request.url),
        status,
      );
    }
  } catch (error) {
    // If there's an error, continue to the page component
    console.error("Middleware error:", error);
  }

  return null;
}

const intlMiddleware = createMiddleware(routing, {
  alternateLinks: false,
});

const authMiddleware = (request: NextRequest, ctx: AppRouteHandlerFnContext) =>
  auth(async (req) => {
    const isLoggedIn = req.auth?.user;
    const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
      req.nextUrl.pathname.startsWith(route),
    );
    const isAuthRoute = AUTH_ROUTES.some((route) =>
      req.nextUrl.pathname.startsWith(route),
    );

    // Redirect to default login page with requested URL as callbackUrl if unauthenticated
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
        return NextResponse.redirect(
          new URL(DEFAULT_LOGIN_REDIRECT_URL, req.nextUrl),
        );
      }
    }

    // Check if there are redirects from Drupal for this request:
    const redirectResponse = await handleDrupalRedirects(request);
    if (redirectResponse) {
      return redirectResponse;
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
