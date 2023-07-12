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

const FrontpageElementsSchema = z.discriminatedUnion("type", [
  FormattedTextSchema,
  ImageSchema,
  VideoSchema,
  LinksSchema,
  AccordionSchema,
  HeroSchema,
  ListingArticlesSchema,
  FileAttachmentsSchema,
]);

export const FrontpageSchema = z.object({
  type: z.literal("node--frontpage"),
  id: z.string(),
  title: z.string(),
  field_content_elements: z.array(FrontpageElementsSchema),
  metatag: MetatagsSchema.optional(),
});

export function validateAndCleanupFrontpage(
  frontpage: DrupalNode,
): Frontpage | null {
  try {
    // Validate the top level fields first.
    const topLevelFrontpageData = FrontpageSchema.omit({
      field_content_elements: true,
    }).parse(frontpage);

    // Validate the field_content_elements separately, one by one.
    // This way, if one of them is invalid, we can still return the rest of the page contents.
    const validatedParagraphs = frontpage.field_content_elements
      .map((paragraph: any) => {
        const result = FrontpageElementsSchema.safeParse(paragraph);

        switch (result.success) {
          case true:
            return result.data;
          case false:
            console.log(
              `Error validating frontpage paragraph ${paragraph.type}: `,
              JSON.stringify(result.error, null, 2),
            );
            return null;
        }
      })
      .filter(Boolean);

    return {
      ...topLevelFrontpageData,
      field_content_elements: validatedParagraphs,
    };
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, frontpage }, null, 2));
    return null;
  }
}

export type Frontpage = z.infer<typeof FrontpageSchema>;
