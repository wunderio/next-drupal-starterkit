import { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound, permanentRedirect, redirect } from "next/navigation";
import { getDraftData } from "next-drupal/draft";
import { setRequestLocale } from "next-intl/server";

import { Node } from "@/components/node";
import { REVALIDATE_LONG } from "@/lib/constants";
import { getNodeByPathQuery } from "@/lib/drupal/get-node";
import { getNodeMetadata } from "@/lib/drupal/get-node-metadata";
import { getNodeStaticParams } from "@/lib/drupal/get-node-static-params";
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
  const metadata = await getNodeMetadata(path, locale);
  return metadata;
}

// Generates static paths for all node types.
export async function generateStaticParams({
  params: { locale },
}: NodePageParams) {
  // TODO: Add the node types you want to generate static paths in the array below.
  const nodeTypes = ["nodePages", "nodeArticles"];
  const params = await getNodeStaticParams(nodeTypes, locale, 10);
  return params;
}

// We set the revalidate time to a long period because the content is not expected to change frequently.
export const revalidate = REVALIDATE_LONG;

export default async function NodePage({
  params: { locale, slug },
}: NodePageParams) {
  setRequestLocale(locale);

  // Construct the path from the slug array.
  const path = "/" + slug.join("/");

  // Are we in Next.js draft mode?
  const isDraftMode = draftMode().isEnabled;

  // Get the node entity from Drupal. We tell the function if we are in draft mode so it can use the correct client
  // in the getNodeByPathQuery function.
  const nodeByPathResult = await getNodeByPathQuery(path, locale, isDraftMode);

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

  // Node not found or is not published:
  if (!node || (!isDraftMode && node.status !== true)) {
    notFound();
  }

  // If the node is a frontpage, redirect to the frontpage:
  if (!isDraftMode && node.__typename === "NodeFrontpage") {
    redirect(`/${locale}`);
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
      const revisionId = draftData.resourceVersion.split(":").slice(1);
      const revisionPath = `/node/${node.id}/revisions/${revisionId}/view`;
      const revisionData = await getNodeByPathQuery(
        revisionPath,
        locale,
        isDraftMode,
      );

      // Instead of the entity at the current revision, we want now to
      // display the entity at the requested revision:
      node = extractEntityFromRouteQueryResult(revisionData);
      if (!node) {
        notFound();
      }
    }
  }

  return <Node node={node} />;
}
