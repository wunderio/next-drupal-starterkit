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

  const loginUrl = `/auth/login?callbackUrl=${encodeURIComponent(
    query.callbackUrl?.toString() || `/${locale}${asPath}`,
  )}`;

  const ref = useOnClickOutside<HTMLDivElement>(close);

  if (status === "authenticated") {
    return (
      <div ref={ref}>
        <span className="sr-only">{t("user-menu")}</span>
        <button
          type="button"
          className="hover:underline"
          onClick={toggle}
          aria-expanded={isOpen}
        >
          <span className="sr-only capitalize sm:not-sr-only sm:mr-2 sm:inline">
            {data.user.name}
          </span>
          <AccountIcon className="inline-block h-6 w-6" />
        </button>
        <ul
          className={clsx(
            "absolute z-50 mt-1 w-fit border border-finnishwinter bg-mischka",
            !isOpen && "hidden",
          )}
        >
          <li>
            <Link
              className="block p-2 hover:bg-primary-50"
              href="/dashboard"
              onClick={close}
            >
              {t("user-dashboard")}
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="block w-full p-2 text-left hover:bg-primary-50"
              onClick={() => void signOut()}
            >
              {t("log-out")}
            </button>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div ref={ref}>
      <span className="sr-only">{t("user-menu")}</span>
      <button type="button" className="hover:underline" onClick={toggle}>
        <span className="sr-only capitalize sm:not-sr-only sm:mr-2 sm:inline">
          {t("user-menu-account")}
        </span>
        <AccountIcon className="inline-block h-6 w-6" />
      </button>
      <ul
        className={clsx(
          "absolute z-50 mt-1 w-fit border border-finnishwinter bg-mischka",
          !isOpen && "hidden",
        )}
      >
        <li>
          <Link
            className="block p-2 hover:bg-primary-50"
            href={loginUrl}
            onClick={close}
          >
            {t("log-in")}
          </Link>
        </li>
        <li>
          <Link
            className="block p-2 hover:bg-primary-50"
            href="/auth/register"
            onClick={close}
          >
            {t("register")}
          </Link>
        </li>
      </ul>
    </div>
  );
}
