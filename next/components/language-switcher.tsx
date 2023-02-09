import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { LangContext } from "pages/_app";

import ChevronIcon from "@/styles/icons/chevron.svg";

export default function LanguageSwitcher() {
  const router = useRouter();
  const { locales, locale: activeLocale } = router;
  const { languageLinks } = useContext(LangContext);

  const [open, setOpen] = useState(false);
  const toggleList = () => {
    setOpen(!open);
  };
  const [language, setLanguage] = useState(activeLocale);
  const [languages, setLanguages] = useState(locales);

  const selectedLanguage = (locale) => {
    setLanguage(locale);
    setOpen(false);
  };

  useEffect(() => {
    setLanguages(locales.filter((locale) => locale != language));
  }, [language, locales]);

  return (
    <nav>
      <button
        type="button"
        className="relative flex flex-1 p-2.5"
        onClick={toggleList}
      >
        <div className={`${activeLocale === language ? "font-bold" : ""} pr-3`}>
          {languageLinks[language]?.name}{" "}
        </div>
        <ChevronIcon className={clsx("h-6 w-6", open && "rotate-180")} />
      </button>
      {open && (
        <ul className="block">
          {languages.map((locale) => {
            return (
              <li
                className="px-3 py-1"
                key={locale}
                onClick={() => selectedLanguage(locale)}
              >
                <Link
                  href={languageLinks[locale].path}
                  as={languageLinks[locale].path}
                  locale={locale}
                  legacyBehavior
                  passHref
                >
                  <a className="block">{languageLinks[locale]?.name}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}
