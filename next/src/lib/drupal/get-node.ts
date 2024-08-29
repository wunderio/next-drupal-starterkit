import { cache } from "react";
import { AbortError } from "p-retry";

import {
  GET_ENTITY_AT_DRUPAL_PATH,
  GET_STATIC_PATHS,
} from "../graphql/queries";

import { drupalClientPreviewer, drupalClientViewer } from "./drupal-client";

import { env } from "@/env";

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

    const data = await drupalClient.doGraphQlRequest(
      GET_ENTITY_AT_DRUPAL_PATH,
      {
        path,
        langcode: locale,
      },
    );

    return data;
  },
);

export async function getNodeQueryResult(
  path: string,
  locale: string,
  isDraftMode: boolean = false,
) {
  try {
    const data = await fetchNodeQueryResult(path, locale, isDraftMode);
    return data;
  } catch (error) {
    const type =
      error instanceof AbortError
        ? "GraphQL"
        : error instanceof TypeError
          ? "Network"
          : "Unknown";

    const moreInfo =
      type === "GraphQL"
        ? `Check graphql_compose logs: ${env.NEXT_PUBLIC_DRUPAL_BASE_URL}/admin/reports`
        : "";

    throw new Error(
      `${type} Error during GetNodeByPath query with $path: "${path}" and $langcode: "${locale}". ${moreInfo}`,
    );
  }
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