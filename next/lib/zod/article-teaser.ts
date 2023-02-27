import { DrupalNode } from "next-drupal";
import { z } from "zod";

import { ImageShape } from "@/lib/zod/paragraph";

export const ArticleTeaserSchema = z.object({
  type: z.literal("node--article"),
  id: z.string(),
  title: z.string(),
  created: z.string(),
  uid: z.object({
    id: z.string(),
    display_name: z.string(),
  }),
  field_image: ImageShape,
  path: z.object({
    alias: z.string(),
  }),
});

export function validateAndCleanupArticleTeaser(
  articleTeaser: DrupalNode
): ArticleTeaser | null {
  try {
    return ArticleTeaserSchema.parse(articleTeaser);
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues }, null, 2));
    return null;
  }
}

export type ArticleTeaser = z.infer<typeof ArticleTeaserSchema>;
