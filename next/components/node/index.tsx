import { NodeArticle } from "@/components/node/node--article";
import { NodeFrontpage } from "@/components/node/node--frontpage";
import { NodePage } from "@/components/node/node--page";
import { TypedRouteEntity } from "@/types/graphql";

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
        // @ts-expect-error
        `components/node.tsx: Node type not yet implemented: ${node.__typename}`,
      );
      return null;
    }
  }
}
