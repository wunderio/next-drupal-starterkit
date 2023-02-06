import { DrupalNode } from "next-drupal";

import { FormattedText } from "@/components/formatted-text";

interface NodeBasicPageProps {
  node: DrupalNode;
}

export function NodeBasicPage({ node, ...props }: NodeBasicPageProps) {
  return (
    <article {...props}>
      <h1 className="mb-4 text-6xl font-black leading-tight">{node.title}</h1>
      {node.body?.processed && (
        <FormattedText
          className="mt-4 text-lg leading-relaxed text-gray-500 sm:text-xl lg:text-xl "
          processed={node.body?.processed}
        />
      )}
    </article>
  );
}
