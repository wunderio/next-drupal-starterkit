import { useTranslations } from "next-intl";

import { HeadingPage } from "@/components/heading--page";

import { LinkWithLocale } from "@/i18n/routing";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
}) {
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

      {process.env.NODE_ENV === "development" && (
        <pre className="p-4 mt-4 text-sm rounded bg-info text-error">
          {error.stack}
        </pre>
      )}
    </>
  );
}
