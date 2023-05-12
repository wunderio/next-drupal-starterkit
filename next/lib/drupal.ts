import { DrupalClient } from "next-drupal";

import { env } from "@/env";

export const drupal = new DrupalClient(env.NEXT_PUBLIC_DRUPAL_BASE_URL, {
  forceIframeSameSiteCookie: env.NODE_ENV === "development",
  auth: {
    clientId: env.DRUPAL_CLIENT_ID,
    clientSecret: env.DRUPAL_CLIENT_SECRET,
  },
});
