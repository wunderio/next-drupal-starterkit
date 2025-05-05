import { NodeArticle } from "@/components/node/node--article";
import { NodeFrontpage } from "@/components/node/node--frontpage";
import { NodePage } from "@/components/node/node--page";
import type { TypedRouteEntity } from "@/types/graphql";

export function Node({ node }: { node: TypedRouteEntity }) {
  if (!node) return null;

  switch (node.__typename) {
    case "NodeFrontpage": {
      return <NodeFrontpage page={node} />;
    }
    case "NodePage": {
      return <NodePage page={node} />;
    }
    case "NodeArticle": {
      return <NodeArticle article={node} />;
    }
    default: {
      console.log(
        // @ts-expect-error All node types should be handled here, we want to know if any are missing.
        `components/node.tsx: Node type not yet implemented: ${node.__typename}`,
      );
      return null;
    }
  }
}
