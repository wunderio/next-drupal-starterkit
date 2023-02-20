import { DrupalNode, DrupalParagraph } from "next-drupal";

import { Paragraph } from "@/components/paragraph";

interface NodeFrontPageProps {
  node: DrupalNode;
}

export function NodeFrontpage({ node }: NodeFrontPageProps) {
  if (!node?.field_content_elements?.length) return null;

  return node.field_content_elements.map((paragraph: DrupalParagraph) => {
    return <Paragraph key={paragraph.id} paragraph={paragraph} />;
  });
}
