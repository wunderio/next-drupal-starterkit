import { env } from "@/env";
import { defaultLocale } from "@/site.config";

export function formatDate(input: string, locale: string): string {
  const date = new Date(input);
  return date.toLocaleDateString(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "UTC",
    timeZoneName: "short",
  });
}

export function formatDateTimestamp(input: number, locale: string): string {
  const date = new Date(input * 1000);
  return date.toLocaleDateString(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function isRelative(url: string) {
  return !new RegExp("^(?:[a-z]+:)?//", "i").test(url);
}

export function formatFileSizeInBytes(x) {
  const units = [
    "bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB",
  ];

  let l = 0,
    n = parseInt(x, 10) || 0;

  while (n >= 1024 && ++l) {
    n = n / 1024;
  }

  return n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + units[l];
}

export const getFileType = (file: string) => {
  const pattern = /\.([^./\\]+)$/;
  const match = file.match(pattern);
  if (match) {
    const fileType = match[1];
    return fileType;
  }
  return null;
};

/**
 * Get the path fragment for the given locale.
 * @returns "" for the default locale, "/locale" for other locales.
 */
export function getLanguagePathFragment(locale?: string) {
  return !locale || locale === defaultLocale ? "" : `/${locale}`;
}

export const makePathAbsolute = (path: string) =>
  env.NEXT_PUBLIC_FRONTEND_URL + path;

export const addSitemapLanguageVersionsOfNode = (translations: any) => {
  const languages: Record<string, string> = {};
  translations.forEach((translation: any) => {
    languages[translation.langcode.id] = makePathAbsolute(translation.path);
  });
  return languages;
};

export const addSitemapLanguageVersionsOfFrontpage = (translations: any) => {
  const languages: Record<string, string> = {};
  translations.forEach((translation: any) => {
    languages[translation.langcode.id] = makePathAbsolute(
      "/" + translation.langcode.id,
    );
  });
  return languages;
};
