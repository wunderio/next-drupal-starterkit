import { z } from "zod";

const MetatagSchema = z
  .object({
    tag: z.string(),
    attributes: z.object({
      name: z.string().optional(),
      content: z.string().optional(),
      href: z.string().optional(),
      rel: z.string().optional(),
    }),
  })
  .optional();

export const MetatagsSchema = z.array(MetatagSchema);

export type Metatag = z.infer<typeof MetatagSchema>;
