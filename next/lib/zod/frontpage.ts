import { DrupalNode } from "next-drupal";
import { z } from "zod";

import {
  FormattedTextSchema,
  ImageSchema,
  LinksSchema,
  VideoSchema,
} from "@/lib/zod/paragraph";

export const FrontpageSchema = z.object({
  type: z.literal("node--frontpage"),
  id: z.string(),
  title: z.string(),
  field_content_elements: z.array(
    z.discriminatedUnion("type", [
      FormattedTextSchema,
      ImageSchema,
      VideoSchema,
      LinksSchema,
    ])
  ),
});

export function validateAndCleanupFrontpage(
  frontpage: DrupalNode
): Frontpage | null {
  try {
    return FrontpageSchema.parse(frontpage);
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues }, null, 2));
    return null;
  }
}

export type Frontpage = z.infer<typeof FrontpageSchema>;
