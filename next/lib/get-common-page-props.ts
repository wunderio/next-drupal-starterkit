import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { getMenus } from "@/lib/drupal/get-menus";

import siteConfig from "@/site.config";

export type CommonPageProps = Awaited<ReturnType<typeof getCommonPageProps>>;

export async function getCommonPageProps({
  locale = siteConfig.defaultLocale,
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
