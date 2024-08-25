import { getDraftData } from "next-drupal/draft";
import { unstable_setRequestLocale } from "next-intl/server";
import { draftMode } from "next/headers";
import { notFound, permanentRedirect, redirect } from "next/navigation";

import { Node } from "@/components/node";
import { getMetadata } from "@/lib/drupal/get-metadata";
import { getNodeQueryResult, getNodeStaticPaths } from "@/lib/drupal/get-node";
import { FragmentMetaTagFragment } from "@/lib/gql/graphql";
import {
  extractEntityFromRouteQueryResult,
  extractRedirectFromRouteQueryResult,
} from "@/lib/graphql/utils";
import { Metadata } from "next";

type NodePageParams = {
  params: { slug: string[]; locale: string };
};

export async function generateMetadata({
  params: { locale, slug },
}: NodePageParams): Promise<Metadata> {
  const path = Array.isArray(slug) ? `/${slug?.join("/")}` : slug;

  // Fetch the node entity from Drupal used to generate metadata.
  const data = await getNodeQueryResult(path, locale);
  const nodeEntity = extractEntityFromRouteQueryResult(data);

  // Generate metadata for the node entity.:
  const metadata = await getMetadata({
    title: nodeEntity.title,
    metatags: nodeEntity.metatag as FragmentMetaTagFragment[],
    context: {
      path,
      locale,
    },
  });

  return metadata;
}

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

// Revalidate the page every 60 seconds.
export const revalidate = 60;

export default async function NodePage({
  params: { locale, slug },
}: NodePageParams) {
  unstable_setRequestLocale(locale);

  const path = Array.isArray(slug) ? `/${slug?.join("/")}` : slug;

  // Are we in Next.js draft mode?
  const isDraftMode = draftMode().isEnabled;

  // Get the node entity from Drupal. We tell the function if we are in draft mode so it can use the correct client
  // in the getNodeQueryResult function.
  const data = await getNodeQueryResult(path, locale, isDraftMode);

  // If the data contains a RedirectResponse, we redirect to the path:
  const redirectResult = extractRedirectFromRouteQueryResult(data);

  if (redirectResult) {
    // Set to temporary redirect for 302 and 307 status codes,
    // and permanent for all others.
    if (redirectResult.status === 307 || redirectResult.status === 302) {
      redirect(redirectResult.url);
    } else {
      permanentRedirect(redirectResult.url);
    }
  }

  // Get the entity from the response:
  let nodeEntity = extractEntityFromRouteQueryResult(data);

  // If there's no node, return 404:
  if (!nodeEntity) {
    notFound();
  }

  // If node is a frontpage, redirect to / for the current locale:
  if (nodeEntity.__typename === "NodeFrontpage") {
    redirect(locale);
  }

  // When in draft mode, we could be requesting a specific revision.
  // In this case, the draftData will contain the resourceVersion property,
  // we can use that in combination with the node id to fetch the correct revision
  // This means that we will need to do a second request to Drupal.
  if (isDraftMode) {
    const draftData = getDraftData();

    if (
      draftData &&
      typeof draftData === "object" &&
      draftData.resourceVersion &&
      // If the resourceVersion is "rel:latest-version", we don't need to fetch the revision:
      draftData.resourceVersion !== "rel:latest-version"
    ) {
      // Get the node id from the entity we already have:
      const revisionId = draftData.resourceVersion.split(":").slice(1);
      const revisionPath = `/node/${nodeEntity.id}/revisions/${revisionId}/view`;

      const revisionData = await getNodeQueryResult(
        revisionPath,
        locale,
        isDraftMode,
      );

      const revisedNodeEntity = extractEntityFromRouteQueryResult(revisionData);

      // If we can't find the revision, return 404:
      if (!revisedNodeEntity) {
        notFound();
      }

      // Use the revised node entity for the rest of the page:
      nodeEntity = revisedNodeEntity;
    }
  }

  // Unless we are in draft mode, return 404 if the node is set to unpublished:
  if (!isDraftMode && nodeEntity.status !== true) {
    notFound();
  }

  return <Node node={nodeEntity} />;
}
