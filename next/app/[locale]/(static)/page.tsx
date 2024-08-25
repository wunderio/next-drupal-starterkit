import { unstable_setRequestLocale } from "next-intl/server";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { Node } from "@/components/node";
import { getMetadata } from "@/lib/drupal/get-metadata";
import { getNodeQueryResult } from "@/lib/drupal/get-node";
import { FragmentMetaTagFragment } from "@/lib/gql/graphql";
import { extractEntityFromRouteQueryResult } from "@/lib/graphql/utils";
import { Metadata } from "next";

type FrontpageParams = {
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale },
}: FrontpageParams): Promise<Metadata> {
  const path = `/frontpage-${locale}`;

  const data = await getNodeQueryResult(path, locale);
  const nodeEntity = extractEntityFromRouteQueryResult(data);

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

export const revalidate = 10;

export default async function FrontPage({
  params: { locale },
}: FrontpageParams) {
  unstable_setRequestLocale(locale);
  // const t = await getTranslations();

  // This works because it matches the pathauto pattern for the Frontpage content type defined in Drupal
  const path = `/frontpage-${locale}`;

  // Get the node entity from Drupal and extract the frontpage node
  const data = await getNodeQueryResult(path, locale);
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
