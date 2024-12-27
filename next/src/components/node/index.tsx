import { never } from "zod";

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
      // This will show ts error if a node type is implemented in the Drupal GraphQL schema,
      // but is missing from the switch statement
      node === typeof never;
      console.log(
        `components/node.tsx: Node type not yet implemented: ${(node as TypedRouteEntity).__typename}`,
      );
      return null;
    }
  }
}
