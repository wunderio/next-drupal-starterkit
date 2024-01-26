import { TypedRouteEntity } from "@/types/graphql";

import { NodeArticle } from "./node--article";
import { NodePage } from "./node--page";

export function Node({ node }: { node: TypedRouteEntity }) {
  if (!node) return null;

  switch (node.__typename) {
    case "NodePage": {
      return <NodePage page={node} />;
    }
    case "NodeArticle": {
      return <NodeArticle article={node} />;
    }
    default: {
      console.log(
        `components/node.tsx: Node type not yet implemented: ${node.__typename}`,
      );
      return null;
    }
  }
}
