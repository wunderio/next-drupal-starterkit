import { GetStaticPropsContext } from "next";
import pRetry from "p-retry";

import { Translations } from "@/lib/contexts/language-links-context";
import { GET_NODE_PATH_BY_ID_AND_LANGCODE } from "@/lib/graphql/queries";
import { TypedRouteEntity } from "@/types/graphql";

import { GraphQlDrupalClient } from "./graphql-drupal-client";

/**
 * Given a node, it will return the node translations for it.
 */
export const getNodeTranslatedVersions = async (
  node: NonNullable<TypedRouteEntity>,
  { locales, defaultLocale }: GetStaticPropsContext,
  drupal: GraphQlDrupalClient,
) => {
  if (!node) {
    return {};
  }

  // Add the node itself to the translations:
  const nodeTranslations: Translations = {
    [node.langcode.id]: node.path,
  };

  if (Array.isArray(locales) && defaultLocale) {
    for (let i = 0; i < locales.length; i++) {
      // We already have the info for the current locale:
      if (locales[i] == node.langcode.id) {
        continue;
      }

      const variables = {
        id: node.id,
        langcode: locales[i],
      };

      const translatedNodeResult = await pRetry(
        () =>
          drupal.doGraphQlRequest(GET_NODE_PATH_BY_ID_AND_LANGCODE, variables),
        { retries: 5 },
      );

      if (
        translatedNodeResult.node?.status &&
        translatedNodeResult.node?.langcode.id &&
        translatedNodeResult.node?.path
      ) {
        nodeTranslations[translatedNodeResult.node.langcode.id] =
          translatedNodeResult.node.path;
      }
    }
  }

  return nodeTranslations;
};
