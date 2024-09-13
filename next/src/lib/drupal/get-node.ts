import { cache } from "react";
import { AbortError } from "p-retry";

import { GetNodeByPathQuery } from "../gql/graphql";
import {
  GET_ENTITY_AT_DRUPAL_PATH,
  GET_STATIC_PATHS,
} from "../graphql/queries";

import { drupalClientPreviewer, drupalClientViewer } from "./drupal-client";

import { env } from "@/env";

/**
 * Fetches a node from Drupal.
 * Uses react cache to avoid fetching the same node multiple times during the same render cycle.
 *
 */
export const fetchNode = cache(
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

/**
 * Retrieves a node by path and locale.
 */
export async function getNodeByPathQuery(
  path: string,
  locale: string,
  isDraftMode: boolean = false,
): Promise<{
  data: GetNodeByPathQuery | null;
  error: string | null;
}> {
  try {
    const data = await fetchNode(path, locale, isDraftMode);
    return { data: data, error: null };
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

    const errorMessage = `${type} Error during GetNodeByPath query with $path: "${path}" and $langcode: "${locale}". ${moreInfo}`;
    console.log(JSON.stringify(errorMessage, null, 2));
    return { data: null, error: errorMessage };
  }
}

/**
 * Fetches static paths for SSG.
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
