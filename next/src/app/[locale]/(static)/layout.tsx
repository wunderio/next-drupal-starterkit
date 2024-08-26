import { unstable_setRequestLocale } from "next-intl/server";

import PageLayout from "@/components/page-layout";

export default function StaticLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return <PageLayout>{children}</PageLayout>;
}
