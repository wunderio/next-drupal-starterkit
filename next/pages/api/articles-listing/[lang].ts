import { NextApiRequest, NextApiResponse } from "next";

import { drupalClientViewer } from "@/lib/drupal/drupal-client";
import { LISTING_ARTICLES } from "@/lib/graphql/queries";

import siteConfig from "@/site.config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const languagePrefix =
      req.headers["accept-language"] || siteConfig.defaultLocale;

    const limit = Number(req.query.limit) || 10;

    const articlesQueryResult = await drupalClientViewer.doGraphQlRequest(
      LISTING_ARTICLES,
      {
        langcode: languagePrefix,
        page: 0,
        pageSize: limit,
      },
    );

    // Set cache headers: 60 seconds max-age, stale-while-revalidate
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");

    res.json(articlesQueryResult.articlesView?.results);
  }

  res.end();
}
