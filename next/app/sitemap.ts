import { MetadataRoute } from "next";

import { drupal } from "@/lib/drupal/drupal-client";
import { GET_SITEMAP_NODES } from "@/lib/graphql/queries";
import {
  addSitemapLanguageVersionsOfFrontpage,
  addSitemapLanguageVersionsOfNode,
  makePathAbsolute,
} from "@/lib/utils";

import siteConfig from "@/site.config";

const DEFAULT_SITEMAP_PRIORITY = 0.7;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all languages from site config:
  const languages = Object.keys(siteConfig.locales);
  // Initialize the sitemap:
  let sitemap = [];

  // For each language, start fetching the nodes for the sitemap:
  for (const lang of languages) {
    let page = 0;
    let totalItems = 0;
    // Initialize the page size to 0, we will get the actual value from the first request:
    let pageSize = 0;

    do {
      const data = await drupal.doGraphQlRequest(
        GET_SITEMAP_NODES,
        {
          page: page,
          langcode: lang,
        },
        false, // We only want published nodes, so we disable authentication.
      );

      // Get the total number of items and the page size that is set for the view:
      if (page === 0) {
        totalItems = data.sitemapNodes?.pageInfo?.total;
        pageSize = data.sitemapNodes?.pageInfo?.pageSize;
      }

      // Prepare the nodes for the sitemap:
      const nodes = data.sitemapNodes?.results?.map((node) => ({
        url:
          // Special case for the frontpage: instead of the node path, use the language path.
          node.__typename === "NodeFrontpage"
            ? makePathAbsolute(`/${node.langcode.id}`)
            : makePathAbsolute(node.path),
        lastModified: new Date(node.changed.timestamp * 1000),
        alternates: {
          languages:
            node.__typename === "NodeFrontpage"
              ? addSitemapLanguageVersionsOfFrontpage(node.translations)
              : addSitemapLanguageVersionsOfNode(node.translations),
        },
        priority:
          node.__typename === "NodeFrontpage" ? 1 : DEFAULT_SITEMAP_PRIORITY,
      }));

      // Add the nodes to the sitemap:
      sitemap = [...sitemap, ...nodes];
      // Increment the page number:
      page++;
    } while (page * pageSize < totalItems);
  }

  return sitemap;
}

export const revalidate = 3600; // Revalidate the sitemap every hour.
