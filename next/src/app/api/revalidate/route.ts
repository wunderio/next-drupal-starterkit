import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";

import { env } from "@/env";
import { routing } from "@/i18n/routing";

// eslint-disable-next-line @typescript-eslint/require-await
async function handler(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const path = searchParams.get("path");
  const secret = searchParams.get("secret");

  // Validate secret.
  if (secret !== env.DRUPAL_REVALIDATE_SECRET) {
    return new Response("Invalid secret.", { status: 401 });
  }

  // Validate path.
  if (!path) {
    return new Response("Invalid path.", { status: 400 });
  }

  try {
    revalidatePath(path);

    const locale = path.split("/")[1];
    // If the locale in the path is the default locale, we need to revalidate the path without the locale as well
    if (locale === routing.defaultLocale) {
      const pathname = "/" + path.split("/").slice(2).join("/");
      revalidatePath(pathname);
    }

    return new Response("Revalidated.");
  } catch (error) {
    return new Response((error as Error).message, { status: 500 });
  }
}

export { handler as GET, handler as POST };
