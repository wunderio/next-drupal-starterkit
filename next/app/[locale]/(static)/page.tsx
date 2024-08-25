import { Node } from "@/components/node";
import { drupalClientViewer } from "@/lib/drupal/drupal-client";
import { GET_ENTITY_AT_DRUPAL_PATH } from "@/lib/graphql/queries";
import { extractEntityFromRouteQueryResult } from "@/lib/graphql/utils";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

type FrontpageParams = {
  params: { locale: string };
};

export const revalidate = 10;

export default async function FrontPage({
  params: { locale },
}: FrontpageParams) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();

  // This works because it matches the pathauto pattern for the Frontpage content type defined in Drupal
  const path = `/frontpage-${locale}`;

  const data = await drupalClientViewer.doGraphQlRequest(
    GET_ENTITY_AT_DRUPAL_PATH,
    {
      path,
      langcode: locale,
    },
  );

  const nodeEntity = extractEntityFromRouteQueryResult(data);

  return <Node node={nodeEntity} />;
}
