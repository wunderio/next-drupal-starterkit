import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { LangContext } from "pages/_app";

export default function LocaleSwitcher() {
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
  }, [language]);

  return (
    <nav>
      <button
        type="button"
        className="flex flex-1 relative p-2.5"
        onClick={toggleList}
      >
        <div className={`${activeLocale === language ? "font-bold" : ""} pr-3`}>
          {languageLinks[language]?.name}{" "}
        </div>
        {/* icons from https://heroicons.com/  */}
        {open && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        )}
        {!open && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        )}
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
