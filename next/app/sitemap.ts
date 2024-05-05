import { MetadataRoute } from "next";

import { drupal } from "@/lib/drupal/drupal-client";
import { GET_SITEMAP_NODES } from "@/lib/graphql/queries";

import siteConfig from "@/site.config";

const makePathAbsolute = (path: string) =>
  // eslint-disable-next-line n/no-process-env
  process.env.NEXT_PUBLIC_FRONTEND_URL + path;

const addLanguageVersionsOfNode = (translations: any) => {
  const languages: Record<string, string> = {};
  translations.forEach((translation: any) => {
    languages[translation.langcode.id] = makePathAbsolute(translation.path);
  });
  return languages;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all languages from site config:
  const languages = Object.keys(siteConfig.locales);
  let sitemap = [];

  // For each language, do a GraphQL request to get all nodes:
  for (const lang of languages) {
    const data = await drupal.doGraphQlRequest(GET_SITEMAP_NODES, {
      number: 100,
      langcode: lang,
    });

    for (const key in data) {
      if (Array.isArray(data[key].nodes)) {
        const nodes = data[key].nodes.map(
          (node: {
            path: string;
            changed: { timestamp: number };
            translations: any;
          }) => ({
            url: makePathAbsolute(node.path),
            lastModified: new Date(node.changed.timestamp * 1000),
            alternates: {
              languages: addLanguageVersionsOfNode(node.translations),
            },
          }),
        );
        sitemap = [...sitemap, ...nodes];
      }
    }
  }

  return sitemap;
}
