import { draftMode } from "next/headers";
import { notFound, permanentRedirect, redirect } from "next/navigation";
import { getDraftData } from "next-drupal/draft";
import { unstable_setRequestLocale } from "next-intl/server";

import { Node } from "@/components/node";
import {
  drupalClientPreviewer,
  drupalClientViewer,
} from "@/lib/drupal/drupal-client";
import { GET_ENTITY_AT_DRUPAL_PATH } from "@/lib/graphql/queries";
import {
  extractEntityFromRouteQueryResult,
  extractRedirectFromRouteQueryResult,
} from "@/lib/graphql/utils";

type NodePageParams = {
  params: { slug: string[]; locale: string };
};

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
  const data = await drupalClientViewer.doGraphQlRequest(
    GET_ENTITY_AT_DRUPAL_PATH,
    {
      path,
      langcode: locale,
    },
  );
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

      const revisionData = await drupalClientPreviewer.doGraphQlRequest(
        GET_ENTITY_AT_DRUPAL_PATH,
        { path: revisionPath, langcode: locale },
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
