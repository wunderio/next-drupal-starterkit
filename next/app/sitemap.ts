import { MetadataRoute } from "next";

import { drupal } from "@/lib/drupal/drupal-client";
import { GET_SITEMAP_NODES } from "@/lib/graphql/queries";
import {
  addSitemapLanguageVersionsOfFrontpage,
  addSitemapLanguageVersionsOfNode,
  makePathAbsolute,
} from "@/lib/utils";

import siteConfig from "@/site.config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all languages from site config:
  const languages = Object.keys(siteConfig.locales);
  // Initialize the sitemap:
  let sitemap = [];

  // For each language, do a GraphQL request to get all nodes:
  for (const lang of languages) {
    // Set the page size and start at page 0:
    const pageSize = 50; // this value needs to be one of the available values in the view defined in Drupal or the query will return an error.
    let page = 0;
    let totalItems = 0;

    do {
      const data = await drupal.doGraphQlRequest(GET_SITEMAP_NODES, {
        page: page,
        langcode: lang,
        pagesize: pageSize,
      });

      // Get the total number of items on the first page:
      if (page === 0) {
        totalItems = data.sitemapNodes?.pageInfo?.total;
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
      }));

      // Add the nodes to the sitemap:
      sitemap = [...sitemap, ...nodes];
      page++;
    } while (page * pageSize < totalItems);
  }

  return sitemap;
}
