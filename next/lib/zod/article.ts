import { DrupalNode } from "next-drupal";
import { z } from "zod";

import { MetatagsSchema } from "@/lib/zod/metatag";
import { ImageShape } from "@/lib/zod/paragraph";

export const ArticleSchema = z.object({
  type: z.literal("node--article"),
  id: z.string(),
  title: z.string(),
  created: z.string(),
  body: z.object({
    processed: z.string(),
  }),
  uid: z.object({
    id: z.string(),
    display_name: z.string(),
  }),
  field_image: ImageShape,
  metatag: MetatagsSchema.optional(),
});

export function validateAndCleanupArticle(article: DrupalNode): Article | null {
  try {
    return ArticleSchema.parse(article);
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues }, null, 2));
    return null;
  }
}

export type Article = z.infer<typeof ArticleSchema>;
