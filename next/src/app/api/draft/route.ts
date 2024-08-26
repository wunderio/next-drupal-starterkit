import type { NextRequest } from "next/server";
import { enableDraftMode } from "next-drupal/draft";

import { drupalClientPreviewer } from "@/lib/drupal/drupal-client";

// eslint-disable-next-line
export async function GET(request: NextRequest): Promise<Response | never> {
  return enableDraftMode(request, drupalClientPreviewer);
}
