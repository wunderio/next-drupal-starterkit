import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations();
  return <div>Test page using app router. {t("meta-site-name")}</div>;
}
