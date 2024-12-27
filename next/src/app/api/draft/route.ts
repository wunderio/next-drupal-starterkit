import type { NextRequest } from "next/server";
import { enableDraftMode } from "next-drupal/draft";

import { drupalClientPreviewer } from "@/lib/drupal/drupal-client";

export async function GET(request: NextRequest) {
  return enableDraftMode(request, drupalClientPreviewer);
}
