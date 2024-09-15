import { Metadata } from "next";

import { FragmentMetaTagFragment } from "../gql/graphql";
import { extractEntityFromRouteQueryResult } from "../graphql/utils";

import { generateNodeMetadata } from "./generate-node-metadata";
import { getNodeByPathQuery } from "./get-node";

export async function getNodeMetadata(
  path: string,
  locale: string,
): Promise<Metadata> {
  // Fetch the frontpage node from Drupal used to generate metadata.
  const nodeByPathResult = await getNodeByPathQuery(path, locale);

  // If the query result contains an error, we return a default metadata object.
  if (nodeByPathResult.error) {
    return {
      title: "Error",
      description: "Error",
    };
  }

  // Extract the frontpage node from the query result
  const nodeEntity = extractEntityFromRouteQueryResult(nodeByPathResult.data);

  // Get metadata for the frontpage node.
  const metadata = await generateNodeMetadata({
    title: nodeEntity?.title,
    metatags: nodeEntity?.metatag as FragmentMetaTagFragment[],
    translations: nodeEntity?.translations,
    path: "/",
    locale,
  });

  return metadata;
}
