import Link from "next/link";
import { useRouter } from "next/router";

export default function LocaleSwitcher() {
  const router = useRouter();
  const { locales, locale: activeLocale } = router;

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
              <Link href="/" locale={locale}>
                {locale}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
