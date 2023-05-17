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
    query.callbackUrl?.toString() || `/${locale}${asPath}`
  )}`;

  const ref = useOnClickOutside<HTMLUListElement>(close);

  if (status === "authenticated") {
    return (
      <div>
        <span className="sr-only">{t("user-menu")}</span>
        <button
          type="button"
          className="hover:underline"
          onClick={toggle}
          aria-expanded={isOpen ? "true" : "false"}
        >
          <span className="capitalize max-sm:sr-only sm:not-sr-only sm:mr-2 sm:inline">
            {data.user.name}
          </span>
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
    <div>
      <span className="sr-only">{t("user-menu")}</span>
      <button type="button" className="hover:underline" onClick={toggle}>
        <span className="hidden sm:mr-2 sm:inline">
          {t("log-in-or-register")}
        </span>
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
