import { drupalClientViewer } from "@/lib/drupal/drupal-client";
import type { FragmentArticleTeaserFragment } from "@/lib/gql/graphql";
import { LISTING_ARTICLES } from "@/lib/graphql/queries";

import { routing } from "@/i18n/routing";

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
    const articlesQueryResult = await drupalClientViewer.doGraphQlRequest(
      LISTING_ARTICLES,
      {
        langcode: locale,
        page: 0,
        pageSize: limit,
        sticky,
      },
    );

    return (
      (articlesQueryResult.articlesView
        .results as FragmentArticleTeaserFragment[]) ?? []
    );
  } catch (error) {
    console.error(error);
  }
}
