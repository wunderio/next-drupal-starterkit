import { setRequestLocale } from "next-intl/server";

import PageLayout from "@/components/page-layout";

export default async function StaticLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PageLayout>{children}</PageLayout>;
}
