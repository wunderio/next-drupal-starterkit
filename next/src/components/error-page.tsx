import { useTranslations } from "next-intl";

import { HeadingPage } from "@/components/heading--page";

import { env } from "@/env";
import { LinkWithLocale } from "@/i18n/routing";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const t = useTranslations("Error");

  if (env.NODE_ENV === "development") {
    throw error;
  }

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
