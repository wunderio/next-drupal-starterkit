import { cache } from "react";

import {
  GET_ENTITY_AT_DRUPAL_PATH,
  GET_STATIC_PATHS,
} from "../graphql/queries";

import { drupalClientPreviewer, drupalClientViewer } from "./drupal-client";

/**
 * Fetches the node entity at the given path.
 * Uses the react cache() function to cache the result during the request lifecycle.
 * Instead of using this on the pages, use the getNodeQueryResult() instead,
 * so dont need to pass the isDraftMode argument
 */
export const fetchNodeQueryResult = cache(
  async (path: string, locale: string, isDraftMode: boolean) => {
    const drupalClient = isDraftMode
      ? drupalClientPreviewer
      : drupalClientViewer;

    try {
      const data = await drupalClient.doGraphQlRequest(
        GET_ENTITY_AT_DRUPAL_PATH,
        {
          path,
          langcode: locale,
        },
      );

      return data;
    } catch (error) {
      console.error("Error fetching node.");
      return null;
    }
  },
);

export async function getNodeQueryResult(
  path: string,
  locale: string,
  isDraftMode: boolean = false,
) {
  const data = await fetchNodeQueryResult(path, locale, isDraftMode);
  return data;
}

/**
 * Function to get the static paths for the next.js static site generation.
 */
export async function getNodeStaticPaths({
  limit,
  locale,
}: {
  limit: number;
  locale: string;
}) {
  const paths = await drupalClientViewer.doGraphQlRequest(GET_STATIC_PATHS, {
    number: limit,
    langcode: locale,
  });

  return paths;
}
