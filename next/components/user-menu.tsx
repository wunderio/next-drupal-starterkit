import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { useRef, useState } from "react";
import clsx from "clsx";

import { useOnClickOutside } from "@/lib/hooks/use-on-click-outside";
import AccountIcon from "@/styles/icons/account-circle.svg";

export function UserMenu() {
  const { t } = useTranslation();
  const { data, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((o) => !o);
  const close = () => setIsOpen(false);

  // Close on click outside
  const listRef = useRef<HTMLUListElement>(null);
  useOnClickOutside(listRef, close, "mousedown");

  return (
    <nav>
      {status === "authenticated" && (
        <>
          <button type="button" className="group" onClick={toggle}>
            <span className="inline-block group-hover:underline">
              {data.user.name}
            </span>
            <AccountIcon className="ml-2 hidden h-6 w-6 sm:inline-block" />
          </button>
          <ul
            ref={listRef}
            className={clsx(
              "absolute z-50 mt-1 w-fit border border-finnishwinter bg-mischka",
              !isOpen && "hidden"
            )}
          >
            <li>
              <Link
                className="block p-2 hover:bg-primary-50"
                href={"/dashboard"}
              >
                Your dashboard
              </Link>
            </li>
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
        </>
      )}
      {status === "unauthenticated" && (
        <Link href="/api/auth/signin" passHref>
          <span className=" sm:mr-2 sm:inline">{t("log-in")}</span>
          <AccountIcon className="inline-block hidden h-6 w-6 sm:inline" />
        </Link>
      )}
    </nav>
  );
}
