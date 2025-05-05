import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import RegisterForm from "@/components/forms/register-form";

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
  setRequestLocale(locale);

  return <RegisterForm />;
}
