import { drupal } from "@/lib/drupal/drupal-client";
import type { ArticleTeaserType } from "@/types/graphql";

import { LISTING_ARTICLES } from "../graphql/queries";

import siteConfig from "@/site.config";

type GetArticlesArgs = {
  limit?: number;
  offset?: number;
  locale?: string;
};

export const getArticles = async ({
  limit = 5,
  offset = 0,
  locale = siteConfig.defaultLocale,
}: GetArticlesArgs): Promise<{
  totalPages: number;
  nodes: ArticleTeaserType[];
}> => {
  let nodes: ArticleTeaserType[] = [];
  let totalPages = 1;
  try {
    const articlesViewResult = await drupal.doGraphQlRequest(LISTING_ARTICLES, {
      langcode: locale,
      page: 0,
      pageSize: limit,
      offset: offset,
    });

    if (articlesViewResult.articlesView?.results) {
      nodes = articlesViewResult.articlesView.results as ArticleTeaserType[];
      // To get to the total number of pages, we need to add the offset
      // to the "total" property, that is to be considered as the total "remaining"
      // articles to be displayed.
      totalPages = Math.ceil(
        (articlesViewResult.articlesView.pageInfo.total + offset) / limit,
      );
    }
  } catch (error) {
    console.error(error);
  }

  return {
    totalPages,
    nodes,
  };
};

export const getLatestArticlesItems = async (
  args: GetArticlesArgs,
): Promise<{
  totalPages: number;
  articles: ArticleTeaserType[];
}> => {
  const { totalPages, nodes } = await getArticles(args);

  return {
    totalPages,
    articles: nodes,
  };
};
