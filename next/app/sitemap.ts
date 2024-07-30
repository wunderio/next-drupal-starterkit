import type { MetadataRoute } from "next";
import { AbortError } from "p-retry";

import { drupalClientViewer } from "@/lib/drupal/drupal-client";
import { GET_SITEMAP_NODES } from "@/lib/graphql/queries";
import {
  addSitemapLanguageVersionsOfFrontpage,
  addSitemapLanguageVersionsOfNode,
  getLanguagePathFragment,
  makePathAbsolute,
} from "@/lib/utils";

import { env } from "@/env";
import { i18n } from "@/next-i18next.config";

const locales = i18n.locales;
type Locale = (typeof locales)[number];

const SITEMAP_PRIORITY_FRONT = 1;
const SITEMAP_PRIORITY_LANDING = 0.8;
const SITEMAP_PRIORITY_DEFAULT = 0.5;

async function getSitemapNodes({
  locale,
  page,
}: {
  locale: Locale;
  page: number;
}) {
  const response = await drupalClientViewer
    .doGraphQlRequest(GET_SITEMAP_NODES, {
      langcode: locale,
      page,
    })
    .catch((error) => {
      const type =
        error instanceof AbortError
          ? "GraphQL"
          : error instanceof TypeError
            ? "Network"
            : "Unknown";

      const moreInfo =
        type === "GraphQL"
          ? `Check graphql_compose logs: ${env.NEXT_PUBLIC_DRUPAL_BASE_URL}/admin/reports`
          : "";

      throw new Error(
        `${type} Error during GET_SITEMAP_NODES query for locale "${locale}" at page ${page}. ${moreInfo}`,
      );
    });

  if (!response?.sitemapNodes?.results || !response?.sitemapNodes?.pageInfo) {
    throw new Error(
      `Sitemap: GET_SITEMAP_NODES returned missing data for locale "${locale}" at page ${page}.`,
    );
  }

  const { results, pageInfo } = response.sitemapNodes;

  return {
    results,
    pageInfo,
  };
}

async function generateSitemap(locale: Locale) {
  // Fetch the first page of nodes along with the necessary info to fetch the rest:
  const {
    results: firstPageNodes,
    pageInfo: { total, pageSize },
  } = await getSitemapNodes({
    locale,
    page: 0,
  });

  // Create an array containing the remaining pages we need to fetch.
  // e.g. if pageSize is 100 and total is 350, we still need to fetch pages [1, 2, 3]:
  const pagesToFetch = Array.from({
    length: Math.floor(total / pageSize),
  }).map((_, i) => i + 1);

  // Fetch the remaining pages in parallel:
  const otherNodes = await Promise.all(
    pagesToFetch.map((page) =>
      getSitemapNodes({ locale, page }).then(({ results }) => results),
    ),
  );

  // Combine the nodes into a single array:
  const nodes = [firstPageNodes, ...otherNodes].flat();

  // We can now generate the sitemap for this locale:
  return nodes
    .map((node) => {
      const isFrontpage = node.__typename === "NodeFrontpage";
      const isLandingpage = isFrontpage
        ? false
        : // Matches e.g. "/about-us", but not "/about-us/our-team":
          node.path
            .split("/")
            .filter(Boolean)
            .filter((pathPart) => pathPart !== locale).length < 2;

      const url = makePathAbsolute(
        getLanguagePathFragment(locale) + (isFrontpage ? "" : node.path),
      );

      const priority =
        (isFrontpage && SITEMAP_PRIORITY_FRONT) ||
        (isLandingpage && SITEMAP_PRIORITY_LANDING) ||
        SITEMAP_PRIORITY_DEFAULT;

      const lastModified = new Date(
        node.changed.timestamp * 1000,
      ).toISOString();

      const alternates = {
        languages:
          node.__typename === "NodeFrontpage"
            ? addSitemapLanguageVersionsOfFrontpage(node.translations)
            : addSitemapLanguageVersionsOfNode(node.translations),
      };

      return {
        url,
        priority,
        lastModified,
        alternates,
      };
    })
    .sort((a, b) => {
      // First sort by priority:
      const priorityDiff = Number(b.priority) - Number(a.priority);
      if (priorityDiff) return priorityDiff;

      // Then by last modified date:
      const lastModifiedDiff = Number(b.lastModified) - Number(a.lastModified);
      if (lastModifiedDiff) return lastModifiedDiff;

      // Then by url:
      return a.url.localeCompare(b.url);
    });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Generate a sitemap for each locale in parallel:
  const sitemaps: MetadataRoute.Sitemap[] = await Promise.all(
    locales.map(generateSitemap),
  );

  // Return the combined sitemap for the site:
  return sitemaps.flat();
}

export const revalidate = 3600; // Revalidate the sitemap at most once an hour.

export const fetchCache = "force-no-store";
