import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from 'react';
import { LangContext } from "../pages/_app";


export default function LocaleSwitcher() {
  const router = useRouter();
  const { locales, locale: activeLocale } = router;
  const langs = useContext(LangContext);

  return (
    <div>
      <ul>
        {locales.map((locale) => {
          return (
            <li
              key={locale}
              className={`language ${
                locale === activeLocale ? "font-bold" : ""
              }`}
            >
              <Link href={langs[locale]} as={langs[locale]} locale={locale}>
                {locale}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
