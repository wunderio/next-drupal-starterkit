import { GetStaticPropsContext } from "next";

import { drupal } from "@/lib/drupal";
import { validateAndCleanupMenu } from "@/lib/zod/menu";
import { DrupalMenuLinkContentWithLangcode } from "@/types";

export async function getMenus({
  locale,
  defaultLocale,
}: GetStaticPropsContext) {
  const [{ tree: main }, { tree: footer }] = await Promise.all(
    ["main", "footer"].map((menu) =>
      drupal.getMenu<DrupalMenuLinkContentWithLangcode>(menu, {
        locale,
        defaultLocale,
      }),
    ),
  );

  return {
    main: validateAndCleanupMenu(main),
    footer: validateAndCleanupMenu(footer),
  };
}
