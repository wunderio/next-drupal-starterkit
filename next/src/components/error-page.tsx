import { useTranslations } from "next-intl";

import { HeadingPage } from "@/components/heading--page";

import { LinkWithLocale } from "@/routing";

export default function ErrorPage() {
  const t = useTranslations("Error");

  return (
    <>
      <HeadingPage>{t("title")}</HeadingPage>
      <p className="mt-8 text-lg">
        {t("content")}{" "}
        <LinkWithLocale href="/" className="underline hyperlink">
          {t("back-to-homepage")}
        </LinkWithLocale>
      </p>
    </>
  );
}
