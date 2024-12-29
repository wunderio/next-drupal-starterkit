import { Metadata } from "next";

import { generateNodeMetadata } from "@/lib/drupal/generate-node-metadata";
import { getNodeByPathQuery } from "@/lib/drupal/get-node";
import type { FragmentMetaTagFragment } from "@/lib/gql/graphql";
import { extractEntityFromRouteQueryResult } from "@/lib/graphql/utils";

export async function getNodeMetadata(
  path: string,
  locale: string,
): Promise<Metadata> {
  // Fetch the frontpage node from Drupal used to generate metadata.
  const nodeByPathResult = await getNodeByPathQuery(path, locale);

  // Extract the frontpage node from the query result
  const nodeEntity = extractEntityFromRouteQueryResult(nodeByPathResult);

  // Get metadata for the frontpage node.
  const metadata = await generateNodeMetadata({
    title: nodeEntity?.title,
    metatags: nodeEntity?.metatag as FragmentMetaTagFragment[],
    translations: nodeEntity?.translations,
    path,
    locale,
  });

  return metadata;
}
