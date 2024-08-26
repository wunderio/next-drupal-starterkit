import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { disableDraftMode } from "next-drupal/draft";

// disable draft mode and redirect to the callback path from the query parameter
// eslint-disable-next-line @typescript-eslint/require-await
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const callbackPath = searchParams.get("callbackPath");

  disableDraftMode();
  redirect(callbackPath ?? "/");
}
