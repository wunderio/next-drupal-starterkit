import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { unstable_setRequestLocale } from "next-intl/server";

import { Node } from "@/components/node";
import { drupalClientViewer } from "@/lib/drupal/drupal-client";
import { GET_ENTITY_AT_DRUPAL_PATH } from "@/lib/graphql/queries";
import { extractEntityFromRouteQueryResult } from "@/lib/graphql/utils";

type FrontpageParams = {
  params: { locale: string };
};

export const revalidate = 10;

export default async function FrontPage({
  params: { locale },
}: FrontpageParams) {
  unstable_setRequestLocale(locale);
  // const t = await getTranslations();

  // This works because it matches the pathauto pattern for the Frontpage content type defined in Drupal
  const path = `/frontpage-${locale}`;

  const data = await drupalClientViewer.doGraphQlRequest(
    GET_ENTITY_AT_DRUPAL_PATH,
    {
      path,
      langcode: locale,
    },
  );

  // Extract the frontpage node from the query result
  const frontpage = extractEntityFromRouteQueryResult(data);

  // If the node does not exist or is not a frontpage, return 404
  if (!frontpage || !(frontpage.__typename === "NodeFrontpage")) {
    return notFound();
  }

  // Unless we are in draftMode, return 404 if the node is set to unpublished:
  if (!draftMode().isEnabled && frontpage.status !== true) {
    notFound();
  }

  return <Node node={frontpage} />;
}
