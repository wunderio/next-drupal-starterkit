import { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

import LoginForm from "./form";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("log-in"),
  };
}

export default function LoginPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
