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

  return (
    <>
      <HeadingPage>{t("title")}</HeadingPage>
      <p className="mt-8 text-lg">
        {t("content")}{" "}
        <LinkWithLocale href="/" className="hyperlink underline">
          {t("back-to-homepage")}
        </LinkWithLocale>
      </p>

      {env.NEXT_PUBLIC_NODE_ENV === "development" && (
        <pre className="mt-4 rounded bg-info p-4 text-sm text-error">
          {error.stack}
        </pre>
      )}
    </>
  );
}
