import { z } from "zod";

import { DrupalMenuLinkContentWithLangcode } from "@/types";

export const MenuItemOptionsSchema = z.object({
  attributes: z.object({
    icon: z.string(),
  }),
});

const BaseMenuItemSchema = z.object({
  type: z.literal("menu_link_content--menu_link_content"),
  id: z.string().startsWith("menu_link_content"),
  description: z.string().nullable(),
  parent: z.string(),
  title: z.string(),
  url: z.string(),
  langcode: z.string(),
  options: z.union([
    // Jsonapi will either have an empty array, or an object with the attributes:
    z.tuple([]),
    MenuItemOptionsSchema,
  ]),
});

const MenuItemSchema: z.ZodType<MenuItem> = BaseMenuItemSchema.extend({
  items: z.lazy(() => MenuItemSchema.array()).optional(),
});

const MenuSchema = z.array(MenuItemSchema);

export function validateAndCleanupMenu(
  menu: DrupalMenuLinkContentWithLangcode[],
): Menu | null {
  try {
    return MenuSchema.parse(menu);
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, menu }, null, 2));
    return null;
  }
}

export type MenuItemOptions = z.infer<typeof MenuItemOptionsSchema>;
export type MenuItem = z.infer<typeof BaseMenuItemSchema> & {
  items?: MenuItem[];
};
export type Menu = z.infer<typeof MenuSchema>;
