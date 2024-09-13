import { getNodeStaticPaths } from "./get-node";

export async function getNodeStaticParams(
  nodeTypes: string[],
  locale: string,
  limit = 10,
) {
  const paths = await getNodeStaticPaths({
    limit,
    locale,
  });

  // Dynamically gather paths based on the node types passed in.
  const pathsArray = nodeTypes.reduce((acc, nodeType) => {
    return [...acc, ...(paths?.[nodeType]?.nodes || [])];
  }, []);

  // Remove locale prefix and split the paths into an array of slugs.
  return pathsArray.map(({ path }) => ({
    slug: path.replace(`/${locale}/`, "").split("/"),
  }));
}
