import { NextApiRequest, NextApiResponse } from "next";
import { DrupalNode } from "next-drupal";
import { drupal } from "lib/drupal";

import { validateAndCleanupArticleTeaser } from "@/lib/zod/article-teaser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const languagePrefix = req.headers["accept-language"] || "en";
    const articleTeasers = await drupal.getResourceCollection<DrupalNode[]>(
      "node--article",
      {
        params: {
          "filter[status]": 1,
          "filter[langcode]": languagePrefix,
          "fields[node--article]": "title,path,field_image,uid,created",
          include: "field_image,uid",
          sort: "-created",
        },
      }
    );

    const validatedArticleTeasers = articleTeasers.map((articleNode) =>
      validateAndCleanupArticleTeaser(articleNode)
    );

    res.json(validatedArticleTeasers);
  }

  res.end();
}
