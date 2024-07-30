import { createEnv } from "@t3-oss/env-nextjs";
import zod from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: zod.enum(["development", "production", "test"]),
    DRUPAL_CLIENT_ID: zod.string(),
    DRUPAL_CLIENT_SECRET: zod.string(),
    DRUPAL_CLIENT_VIEWER_ID: zod.string(),
    DRUPAL_CLIENT_VIEWER_SECRET: zod.string(),
    DRUPAL_REVALIDATE_SECRET: zod.string(),
    NEXT_IMAGE_DOMAIN: zod.string(),
  },
  client: {
    NEXT_PUBLIC_DRUPAL_BASE_URL: zod.string().url(),
    NEXT_PUBLIC_FRONTEND_URL: zod.string().url(),
  },

  /* eslint-disable n/no-process-env */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DRUPAL_CLIENT_ID: process.env.DRUPAL_CLIENT_ID,
    DRUPAL_CLIENT_SECRET: process.env.DRUPAL_CLIENT_SECRET,
    DRUPAL_CLIENT_VIEWER_ID: process.env.DRUPAL_CLIENT_VIEWER_ID,
    DRUPAL_CLIENT_VIEWER_SECRET: process.env.DRUPAL_CLIENT_VIEWER_SECRET,
    DRUPAL_REVALIDATE_SECRET: process.env.DRUPAL_REVALIDATE_SECRET,
    NEXT_IMAGE_DOMAIN: process.env.NEXT_IMAGE_DOMAIN,
    NEXT_PUBLIC_DRUPAL_BASE_URL: process.env.NEXT_PUBLIC_DRUPAL_BASE_URL,
    NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
  },
  skipValidation: process.env.STORYBOOK === "true",
  /* eslint-enable n/no-process-env */
});
