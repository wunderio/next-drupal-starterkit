import { GetStaticPropsContext } from "next";
import { DrupalClient, DrupalNode } from "next-drupal";

import siteConfig from "../site.config";

export function formatDate(input: string): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function absoluteUrl(input: string) {
  return `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${input}`;
}

/**
 * Gets the language links for the language switcher.
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
  context: GetStaticPropsContext,
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
    // Only consider a translation if there is actually a translated
    // node:
    nodeTranslations[translated.langcode] = translated.path.alias;
  }

  return nodeTranslations;
};
