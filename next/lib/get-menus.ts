import { GetStaticPropsContext } from "next";

import { drupal } from "@/lib/drupal";

export async function getMenus({
  locale,
  defaultLocale,
}: GetStaticPropsContext) {
  const [{ tree: main }, { tree: footer }] = await Promise.all(
    ["main", "footer"].map((menu) =>
      drupal.getMenu(menu, {
        locale,
        defaultLocale,
      })
    )
  );

  return {
    main,
    footer,
  };
}
