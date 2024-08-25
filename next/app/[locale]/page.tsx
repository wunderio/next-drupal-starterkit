import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

type FrontpageParams = {
  params: { locale: string };
};

export const revalidate = 10;

export default async function FrontPage({
  params: { locale },
}: FrontpageParams) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();

  return <h1>{t("homepage-link")}</h1>;
}
