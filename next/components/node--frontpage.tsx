import { DrupalNode } from "next-drupal";

import { Paragraph } from "@/components/paragraph";

interface NodeFrontPage {
  node: DrupalNode;
  viewMode?: string;
}

export function NodeFrontpage({ node }: NodeFrontPage) {
  if (!node.field_content_elements.length) return null;

  return node.field_content_elements.map((paragraph) => {
    return <Paragraph key={paragraph.id} paragraph={paragraph} />;
  });
}
