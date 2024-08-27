import { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound, permanentRedirect, redirect } from "next/navigation";
import { getDraftData } from "next-drupal/draft";
import { unstable_setRequestLocale } from "next-intl/server";

import { Node } from "@/components/node";
import { REVALIDATE_LONG } from "@/lib/constants";
import { getMetadata } from "@/lib/drupal/get-metadata";
import { getNodeQueryResult, getNodeStaticPaths } from "@/lib/drupal/get-node";
import { FragmentMetaTagFragment } from "@/lib/gql/graphql";
import {
  extractEntityFromRouteQueryResult,
  extractRedirectFromRouteQueryResult,
} from "@/lib/graphql/utils";

type NodePageParams = {
  params: { slug: string[]; locale: string };
};

// The metadata for the page is generated here.
export async function generateMetadata({
  params: { locale, slug },
}: NodePageParams): Promise<Metadata> {
  const path = "/" + slug.join("/");

  // Fetch the node entity from Drupal used to generate metadata.
  const nodeByPathResult = await getNodeQueryResult(path, locale);
  const node = extractEntityFromRouteQueryResult(nodeByPathResult);

  // Generate metadata for the node entity.:
  const metadata = await getMetadata({
    title: node.title,
    metatags: node.metatag as FragmentMetaTagFragment[],
    context: {
      path,
      locale,
    },
  });

  return metadata;
}

// Generate the static paths for all node types.
export async function generateStaticParams({
  params: { locale },
}: NodePageParams) {
  // Get the first 10 paths for all node types.
  const paths = await getNodeStaticPaths({
    limit: 10,
    locale,
  });

  // Combine all the paths into a single array.
  // TODO: When adding more node types, make sure to add them here!
  const pathsArray = [
    ...(paths?.nodePages?.nodes || []),
    ...(paths?.nodeArticles?.nodes || []),
  ];

  // Drupal returns the paths with the locale prefix, e.g. "/en/about".
  // We need to remove the locale prefix and split the path into an array of slugs.
  // e.g. "/en/articles/article-1" -> { slug: ["articles", "article-1"] }
  const params = pathsArray.map(({ path }) => ({
    slug: path.replace(`/${locale}/`, "").split("/"),
  }));

  return params;
}

// We set the revalidate time to a long period because the content is not expected to change frequently.
export const revalidate = REVALIDATE_LONG;

export default async function NodePage({
  params: { locale, slug },
}: NodePageParams) {
  unstable_setRequestLocale(locale);

  const path = "/" + slug.join("/");

  // Are we in Next.js draft mode?
  const isDraftMode = draftMode().isEnabled;

  // Get the node entity from Drupal. We tell the function if we are in draft mode so it can use the correct client
  // in the getNodeQueryResult function.
  const nodeByPathResult = await getNodeQueryResult(path, locale, isDraftMode);

  // The response will contain either a redirect or node data.
  // If it's a redirect, redirect to the new path:
  const redirectResult = extractRedirectFromRouteQueryResult(nodeByPathResult);
  if (redirectResult) {
    // Set to temporary redirect for 302 and 307 status codes,
    // and permanent for all others.
    if (redirectResult.status === 307 || redirectResult.status === 302) {
      redirect(redirectResult.url);
    } else {
      permanentRedirect(redirectResult.url);
    }
  }

  // Extract the node entity from the query result:
  let node = extractEntityFromRouteQueryResult(nodeByPathResult);

  // Node not found:
  if (!node) {
    notFound();
  }

  /*
  TODO: App router doesnt have revalidateReason😞
  if (!node) {
    switch (revalidateReason) {
      case "build":
        // Pages returned from getStaticPaths should always exist. Abort the build:
        throw new Error(
          `Node not found in GetNodeByPath query response with $path: "${path}" and $langcode: "${locale}".`,
        );
      case "stale":
      case "on-demand":
      default:
        // Not an error, the requested node just doesn't exist. Return 404:
        return {
          notFound: true,
          revalidate: REVALIDATE_LONG,
        };
    }
  }
  */

  // Node is not published:
  if (!isDraftMode && node.status !== true) {
    notFound();
  }

  // Node is actually a frontpage:
  if (!isDraftMode && node.__typename === "NodeFrontpage") {
    redirect(locale);
  }

  // When in draftMode, we could be requesting a specific revision.
  // In this case, the draftData will contain the resourceVersion property,
  // which we can use to fetch the correct revision:
  if (isDraftMode) {
    const draftData = getDraftData();

    if (
      draftData &&
      typeof draftData === "object" &&
      "resourceVersion" in draftData &&
      typeof draftData.resourceVersion === "string" &&
      draftData.resourceVersion !== "rel:latest-version"
    ) {
      // Get the node id from the entity we already have:
      const revisionId = draftData.resourceVersion.split(":").slice(1);
      const revisionPath = `/node/${node.id}/revisions/${revisionId}/view`;
      const revisionData = await getNodeQueryResult(
        revisionPath,
        locale,
        isDraftMode,
      );

      // Instead of the entity at the current revision, we want now to
      // display the entity at the requested revision:
      node = extractEntityFromRouteQueryResult(revisionData);
      if (!node) {
        notFound;
      }
    }
  }

  return <Node node={node} />;
}
