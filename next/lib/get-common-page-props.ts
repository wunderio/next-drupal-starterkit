import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { i18nConfig } from "@/i18n";
import { getMenus } from "@/lib/drupal/get-menus";

export type CommonPageProps = Awaited<ReturnType<typeof getCommonPageProps>>;

export async function getCommonPageProps({
  locale = i18nConfig.defaultLocale,
}: {
  locale: GetStaticPropsContext["locale"];
}) {
  const [translations, menus] = await Promise.all([
    serverSideTranslations(locale),
    getMenus({ locale }),
  ]);

  return {
    ...translations,
    menus,
  };
}
