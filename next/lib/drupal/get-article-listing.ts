import { FragmentArticleTeaserFragment } from "../gql/graphql";
import { LISTING_ARTICLES } from "../graphql/queries";

import siteConfig from "@/site.config";
import { drupalClientViewer } from "./drupal-client";

export async function getArticleListing({
  limit = 10,
  locale = siteConfig.defaultLocale,
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
