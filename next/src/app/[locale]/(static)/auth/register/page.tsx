import { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

import RegisterForm from "./form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("register"),
  };
}

export default function RegisterPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return <RegisterForm />;
}
