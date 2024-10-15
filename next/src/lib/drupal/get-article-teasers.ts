import { neshCache } from "@neshca/cache-handler/functions";
import { FragmentArticleTeaserFragment } from "../gql/graphql";
import { LISTING_ARTICLES } from "../graphql/queries";

import { drupalClientViewer } from "./drupal-client";

import { routing } from "@/i18n/routing";
import { REVALIDATE_LONG } from "../constants";
import { cache } from "react";

/**
 * Data-access function to fetch article teasers from Drupal.
 * Use the getArticleTeasers function in components instead of this function.
 *
 * @param limit
 * @param locale
 * @param sticky
 * @returns An array of article teasers.
 */
export async function fetchArticleTeasers(
  limit: number,
  locale: string,
  sticky: boolean,
) {
  return await drupalClientViewer.doGraphQlRequest(LISTING_ARTICLES, {
    langcode: locale,
    page: 0,
    pageSize: limit,
    sticky,
  });
}

// Here we wrap the function in nesh cache to cache the results between requests.
const cachedFetchArticleTeasers = neshCache(fetchArticleTeasers);

/**
 * Function to get article teasers from Drupal.
 * Use this in components to fetch article teasers instead of the fetchArticleTeasers function.
 *
 * @param limit
 * @param locale
 * @param sticky
 * @returns An array of article teasers.
 * @throws If an error occurs during fetching.
 */
export async function getArticleTeasers({
  limit = 10,
  locale = routing.defaultLocale,
  sticky = false,
}: {
  limit: number;
  locale: string;
  sticky?: boolean;
}) {
  try {
    const articlesQueryResult = await cachedFetchArticleTeasers(
      { revalidate: REVALIDATE_LONG },
      limit,
      locale,
      sticky,
    );

    return (
      (articlesQueryResult.articlesView
        .results as FragmentArticleTeaserFragment[]) ?? []
    );
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching article teasers.");
  }
}
