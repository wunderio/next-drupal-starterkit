import { FragmentArticleTeaserFragment } from "../gql/graphql";
import { LISTING_ARTICLES } from "../graphql/queries";

import { drupalClientViewer } from "./drupal-client";

import { i18nConfig } from "@/i18n";

export async function getArticleTeasers({
  limit = 10,
  locale = i18nConfig.defaultLocale,
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
