import { GetStaticPropsContext } from "next";
import { DrupalClient, DrupalNode } from "next-drupal";

import { Translations } from "@/lib/contexts/language-links-context";

/**
 * Given a node, it will return the node translations for it.
 */
export const getNodeTranslatedVersions = async (
  node: DrupalNode,
  context: GetStaticPropsContext,
  drupal: DrupalClient,
) => {
  const nodeTranslations: Translations = {};
  for (let i = 0; i < context.locales.length; i++) {
    const lang = context.locales[i];
    const translated = await drupal.getResource(node.type, node.id, {
      locale: lang,
      defaultLocale: context.defaultLocale,
      withAuth: true,
    });
    // Only consider a translation if there is actually a translated node:
    nodeTranslations[translated.langcode] = translated.path.alias;
  }
  return nodeTranslations;
};
