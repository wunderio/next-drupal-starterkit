import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import clsx from "clsx";

import AccountIcon from "@/styles/icons/account-circle.svg";

export function RegisterMenu() {
  const { locale, asPath, query } = useRouter();
  const { t } = useTranslation();

  const registerUrl = `/auth/register?callbackUrl=${encodeURIComponent(
    query.callbackUrl?.toString() || `/${locale}${asPath}`
  )}`;

  return (
    <Link href={registerUrl} className="hover:underline">
      <span className={clsx("hidden sm:mr-2 sm:inline")}>{t("register")}</span>
      <AccountIcon className="inline-block h-6 w-6" />
    </Link>
  );
}
