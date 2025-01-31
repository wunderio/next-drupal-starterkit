import { setRequestLocale } from "next-intl/server";

import { Node } from "@/components/node";
import { fetchNodeByPathQuery } from "@/lib/drupal/get-node";
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
    return <div>Item not found</div>;
  }

  return (
    <div className="container p-10">
      <Node node={node} />
    </div>
  );
}

export default DrupalPreviewPage;

export const fetchCache = "force-no-store";
