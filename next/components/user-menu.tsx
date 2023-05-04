import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import clsx from "clsx";

import { useOnClickOutside } from "@/lib/hooks/use-on-click-outside";
import AccountIcon from "@/styles/icons/account-circle.svg";

export function UserMenu() {
  const { locale, asPath, query } = useRouter();
  const { t } = useTranslation();
  const { data, status } = useSession();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((o) => !o);
  const close = () => setIsOpen(false);

  const ref = useOnClickOutside<HTMLUListElement>(close);

  const loginUrl = `/auth/login?callbackUrl=${encodeURIComponent(
    query.callbackUrl?.toString() || `/${locale}${asPath}`
  )}`;

  if (status === "authenticated") {
    return (
      <nav>
        <button type="button" className="hover:underline" onClick={toggle} aria-label={t("user-menu")}>
          <span className="sr-only sm:not-sr-only sm:mr-2 sm:inline">{data.user.name}</span>
          <AccountIcon className="inline-block h-6 w-6" />
        </button>
        <ul
          ref={ref}
          className={clsx(
            "absolute z-50 mt-1 w-fit border border-finnishwinter bg-mischka",
            !isOpen && "hidden"
          )}
        >
          <li>
            <button
              type="button"
              className="block p-2 hover:bg-primary-50"
              onClick={() => void signOut()}
            >
              {t("log-out")}
            </button>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <Link href={loginUrl} className="hover:underline" aria-label={t("user-menu")}>
      <span
        className={clsx(
          "hidden sm:mr-2 sm:inline",
          status === "loading" && "opacity-0"
        )}
      >
        {t("log-in")}
      </span>
      <AccountIcon className="inline-block h-6 w-6" />
    </Link>
  );
}
