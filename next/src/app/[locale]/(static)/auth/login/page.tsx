import { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

import LoginForm from "./form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("log-in"),
  };
}

export const dynamic = "force-static";

export default function LoginPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return <LoginForm />;
}
