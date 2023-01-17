import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { LangContext } from "pages/_app";
import { LANGUAGES } from "../config"

export default function LocaleSwitcher() {
  const router = useRouter();
  const { locales, locale: activeLocale } = router;
  const { languageLinks } = useContext(LangContext);
  const [local, setLocal] = useState(activeLocale);

  const handleLocal = (e) => {
    console.log(e.target.value);
    setLocal(e.target.value);
  }

  const defaultLinks = {
    en: '/en',
    fi: '/fi',
    sv: '/sv',
  };

  // const [{ translationUrls }] = useGlobalState();
  // const [links, setLinks] = useState({
  //   ...defaultLinks,
  //   ...translationUrls,
  // });

  // useEffect(() => {
  //   setLinks({
  //     ...defaultLinks,
  //     ...translationUrls,
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [translationUrls]);

  const [open, setOpen] = useState(false);
  const toggleList = () => {
    setOpen(!open)
  }
  const [language, setLanguage] = useState('en');
  const [languages, setLanguages] = useState(locales.filter(locale => locale != language));
  console.log('*****locales', locales);

  const selectedLanguage = (locale) => {
    console.log('locale', locale)
    setLanguage(locale)
    setOpen(false);
  }

  useEffect(() => {
    setLanguages(locales.filter(locale => locale != language))
  }, [language])


  return (
    <div>
      <nav className="absolute">
        <button
          type="button"
          className="dd-header relative"
          onClick={toggleList}
        >
          <div className="dd-header-title">{languageLinks[language]?.name} </div>

        </button>
        {open && <ul className="menus">
          {languages.map(locale => {
            return (
              <button
                type="button"
                className="dd-list-item"
                key={locale}
                onClick={() => selectedLanguage(locale)}
              >
                {/* {LANGUAGES[locale]} */}
                <Link
                  href={languageLinks[locale].path}
                  as={languageLinks[locale].path}
                  locale={locale}
                  legacyBehavior
                >
                  {languageLinks[locale]?.name}
                </Link>
                {/* {item.title}
                {' '}
                {item.selected && <FontAwesome name="check" />} */}
              </button>
              // <li key={locale}
              //   className={`language ${locale === activeLocale ? "font-bold" : ""
              //     }`}
              // >
              //   <Link
              //     href={languageLinks[locale].path}
              //     as={languageLinks[locale].path}
              //     locale={locale}
              //     legacyBehavior
              //   >
              //     {languageLinks[locale].name}
              //   </Link>
              // </li>
            );
          })}

        </ul>}
      </nav>
      {/* <select value={local} onChange={(handleLocal)}>

        {locales.map((locale) => {
          return (
            <option
              key={locale}
              className={`language ${locale === activeLocale ? "font-bold" : ""
                }`}
            >
              <Link
                href={languageLinks[locale].path}
                as={languageLinks[locale].path}
                locale={locale}
                legacyBehavior
              >
                {languageLinks[locale].name}
              </Link>
            </option>
          );
        })}
      </select> */}
      {/* <ul>
        {locales.map((locale) => {
          return (
            <li
              key={locale}
              className={`language ${locale === activeLocale ? "font-bold" : ""
                }`}
            >
              <Link
                href={languageLinks[locale].path}
                as={languageLinks[locale].path}
                locale={locale}
                legacyBehavior
              >
                {languageLinks[locale].name}
              </Link>
            </li>
          );
        })}
      </ul> */}
    </div>
  );
}
