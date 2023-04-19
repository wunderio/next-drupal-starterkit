import zod from "zod";

const envSchema = zod.object({
  // These are only available on the server:
  DRUPAL_CLIENT_ID: zod.string().optional(),
  DRUPAL_CLIENT_SECRET: zod.string().optional(),
  DRUPAL_REVALIDATE_SECRET: zod.string().optional(),
  NEXT_IMAGE_DOMAIN: zod.string().optional(),

  // These are available on both server and client:
  NODE_ENV: zod.union([
    zod.literal("development"),
    zod.literal("production"),
    zod.literal("test"),
  ]),
  NEXT_PUBLIC_FRONTEND_URL: zod.string(),
  NEXT_PUBLIC_DRUPAL_BASE_URL: zod.string(),
});

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  DRUPAL_CLIENT_ID: process.env.DRUPAL_CLIENT_ID,
  DRUPAL_CLIENT_SECRET: process.env.DRUPAL_CLIENT_SECRET,
  DRUPAL_REVALIDATE_SECRET: process.env.DRUPAL_REVALIDATE_SECRET,
  NEXT_IMAGE_DOMAIN: process.env.NEXT_IMAGE_DOMAIN,
  NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
  NEXT_PUBLIC_DRUPAL_BASE_URL: process.env.NEXT_PUBLIC_DRUPAL_BASE_URL,
});
