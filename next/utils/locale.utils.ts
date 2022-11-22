import { DrupalClient, DrupalNode } from "next-drupal";

//import { drupal } from "lib/drupal";
import siteConfig from "../site.config";

/**
 * Gets the language links for the language switcher.
 *
 */
export const setLanguageLinks = (translations = []) => {
  const languageLinks = JSON.parse(JSON.stringify(siteConfig.locales));
  Object.entries(translations).forEach((translation) => {
    languageLinks[translation[0]].path = translation[1];
  });
  return languageLinks;
};

/**
 * Given a node, it will return the node translations for it.
 */
export const getNodeTranslatedVersions = async (
  node: DrupalNode,
  context,
  drupal: DrupalClient
) => {
  const nodeTranslations = {};
  for (let i = 0; i < context.locales.length; i++) {
    const lang = context.locales[i];
    const translated = await drupal.getResource(node.type, node.id, {
      locale: lang,
      defaultLocale: context.defaultLocale,
      withAuth: true,
    });
    nodeTranslations[lang] = translated.path.alias;
  }

  return nodeTranslations;
};
