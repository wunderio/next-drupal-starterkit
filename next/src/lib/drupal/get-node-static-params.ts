import { drupalClientViewer } from "@/lib/drupal/drupal-client";
import { GET_STATIC_PATHS } from "@/lib/graphql/queries";

export async function getNodeStaticParams(
  nodeTypes: string[],
  locale: string,
  limit = 10,
) {
  // Fetch static paths for nodes.
  const paths = await drupalClientViewer.doGraphQlRequest(GET_STATIC_PATHS, {
    number: limit,
    langcode: locale,
  });

  // Extract slugs from paths. We need to remove the locale prefix.
  // For example, if the locale is "en", the path will be "/en/node/1" and we need to extract "node/1".
  // We also need to split the path into an array of slugs. For example, "node/1" will be ["node", "1"].
  const params = nodeTypes.reduce(
    (acc, nodeType) => [
      ...acc,
      ...(paths?.[nodeType]?.nodes || []).map(({ path }) => ({
        slug: path.replace(`/${locale}/`, "").split("/"),
      })),
    ],
    [],
  );

  return params;
}
