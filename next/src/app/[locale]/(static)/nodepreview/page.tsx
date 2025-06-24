import { setRequestLocale } from "next-intl/server";

import { Node } from "@/components/node";
import NotFoundPage from "@/components/not-found-page";
import { fetchNodeByPathQuery } from "@/lib/drupal/get-node-nocache";
import { extractEntityFromRouteQueryResult } from "@/lib/graphql/utils";

async function DrupalPreviewPage({ searchParams, params: { locale } }) {
  setRequestLocale(locale);
  const previewPath = searchParams.path;
  const nodeByPathResult = await fetchNodeByPathQuery(
    previewPath,
    locale,
    true,
  );

  // Extract the node entity from the query result:
  const node = extractEntityFromRouteQueryResult(nodeByPathResult);

  if (!node) {
    return <NotFoundPage />;
  }

  return <Node node={node} />;
}

export default DrupalPreviewPage;

export const fetchCache = "force-no-store";
