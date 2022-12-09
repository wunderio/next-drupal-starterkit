import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { LangContext } from "pages/_app";

export default function LocaleSwitcher() {
  const router = useRouter();
  const { locales, locale: activeLocale } = router;
  const { languageLinks } = useContext(LangContext);

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
              <Link
                href={languageLinks[locale].path}
                as={languageLinks[locale].path}
                locale={locale}
              >
                {languageLinks[locale].name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
