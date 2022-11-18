import siteConfig from "../site.config";

/**
 * Gets the language links for the language switcher.
 *
 */
export const setLanguageLinks = (translations = []) => {
  let languageLinks = JSON.parse(JSON.stringify(siteConfig.locales));
  Object.entries(translations).forEach((translation) => {
    languageLinks[translation[0]].path = translation[1];
  });
  return languageLinks;
};
