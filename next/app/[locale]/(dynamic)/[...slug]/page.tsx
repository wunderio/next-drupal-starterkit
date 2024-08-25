import { unstable_setRequestLocale } from "next-intl/server";
import { notFound, permanentRedirect, redirect } from "next/navigation";

import { drupalClientViewer } from "@/lib/drupal/drupal-client";
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

  console.log("Node entity", nodeEntity);

  return <h1>NodePage</h1>;
}
