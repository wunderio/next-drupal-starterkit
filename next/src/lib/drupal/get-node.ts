import { cache } from "react";
import { neshCache } from "@neshca/cache-handler/functions";
import { AbortError } from "p-retry";

import { REVALIDATE_LONG } from "@/lib/constants";

import { fetchNodeByPathQuery } from "./get-node-nocache";

import { env } from "@/env";

// Here we wrap the function in react cache and nesh cache  avoiding unnecessary requests.
const cachedFetchNodeByPathQuery = neshCache(cache(fetchNodeByPathQuery));

/**
 * Function to retrieve a node by its Drupal path.
 *
 * @param path The Drupal path of the node.
 * @param locale The language code for the locale of the node.
 * @param isDraftMode Optional. Defaults to false. If true, fetches the draft version of the node.
 * @param revision Optional. The revision of the node.
 * @returns An object containing the node data or an error message.
 *
 * @example
 * const { data, error } = await getNodeByPathQuery('/about-us', 'en');
 *
 * // With draft mode enabled:
 * const { data, error } = await getNodeByPathQuery('/about-us', 'en', true);
 *
 * // With draft mode enabled and a specific revision:
 * const { data, error } = await getNodeByPathQuery('/about-us', 'en', true, 'working_copy');
 */
export async function getNodeByPathQuery(
  path: string,
  locale: string,
  isDraftMode: boolean = false,
  revision: string = null,
) {
  try {
    return await cachedFetchNodeByPathQuery(
      { tags: [`/${locale}${path}`], revalidate: REVALIDATE_LONG },
      path,
      locale,
      isDraftMode,
      revision,
    );
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
    throw new Error(errorMessage);
  }
}
