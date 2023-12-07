import { env } from "@/env";

export function absoluteUrl(input: string) {
  return `${env.NEXT_PUBLIC_DRUPAL_BASE_URL}${input}`;
}
