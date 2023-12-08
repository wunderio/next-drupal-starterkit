import { useLocale } from "next-intl";

import { ClientHeader } from "@/components/header/client-header";
import { drupal } from "@/lib/drupal/drupal-client";
import { MenuItem } from "@/lib/zod/menu";

import { i18nConfig } from "@/i18n";

export async function Header() {
  const locale = useLocale();
  const { tree: menu } = await drupal.getMenu<MenuItem>("main", {
    locale,
    defaultLocale: i18nConfig.defaultLocale,
  });

  return <ClientHeader menu={menu} />;
}
