import { DrupalNode } from "next-drupal";
import { z } from "zod";

import { MetatagsSchema } from "@/lib/zod/metatag";
import {
  AccordionSchema,
  FileAttachmentsSchema,
  FormattedTextSchema,
  HeroSchema,
  ImageSchema,
  LinksSchema,
  ListingArticlesSchema,
  VideoSchema,
} from "@/lib/zod/paragraph";

export const PageSchema = z.object({
  type: z.literal("node--page"),
  id: z.string(),
  title: z.string(),
  field_content_elements: z.array(
    z.discriminatedUnion("type", [
      FormattedTextSchema,
      ImageSchema,
      VideoSchema,
      LinksSchema,
      AccordionSchema,
      HeroSchema,
      ListingArticlesSchema,
      FileAttachmentsSchema,
    ])
  ),
  metatag: MetatagsSchema.optional(),
});

export function validateAndCleanupPage(page: DrupalNode): Page | null {
  try {
    return PageSchema.parse(page);
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, page }, null, 2));
    return null;
  }
}

export type Page = z.infer<typeof PageSchema>;
