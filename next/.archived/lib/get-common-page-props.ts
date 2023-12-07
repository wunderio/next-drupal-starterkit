import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { getMenus } from "@/lib/drupal/get-menus";

export type CommonPageProps = Awaited<ReturnType<typeof getCommonPageProps>>;

export async function getCommonPageProps(context: GetStaticPropsContext) {
  const [translations, menus] = await Promise.all([
    serverSideTranslations(context.locale),
    getMenus(context),
  ]);

  return {
    ...translations,
    menus,
  };
}
