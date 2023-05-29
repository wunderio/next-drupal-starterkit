import {
  deserialize,
  DrupalNode,
  getResourceCollection,
  JsonApiResponse,
} from "next-drupal";
import { DrupalJsonApiParams } from "drupal-jsonapi-params";

import { getNodePageJsonApiParams } from "@/lib/get-node-page-json-api-params";

import siteConfig from "@/site.config";

type GetArticlesArgs = {
  limit?: number;
  offset?: number;
  locale: string;
};

export const getArticles = async (
  { limit = 8, offset = 0, locale }: GetArticlesArgs,
  apiParams: DrupalJsonApiParams
): Promise<{
  totalPages: number;
  nodes: DrupalNode[];
}> => {
  apiParams.addPageLimit(limit);

  let nodes: DrupalNode[] = [];
  let totalPages = 1;
  try {
    const result = await getResourceCollection<JsonApiResponse>(
      "node--article",
      {
        deserialize: false,
        params: {
          ...apiParams.getQueryObject(),
          "filter[langcode]": locale,
          "filter[status]": "1",
          page: {
            limit,
            offset,
          },
          sort: "-created",
        },
        locale: locale,
        defaultLocale: siteConfig.defaultLocale,
      }
    );
    if (result.data) {
      nodes = deserialize(result) as DrupalNode[];
      totalPages = Math.ceil(result.meta.count / limit);
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
  args: GetArticlesArgs
): Promise<{
  totalPages: number;
  articles: DrupalNode[];
}> => {
  const apiParams = getNodePageJsonApiParams("node--article");
  const { totalPages, nodes } = await getArticles(args, apiParams);

  return {
    totalPages,
    articles: nodes,
  };
};
