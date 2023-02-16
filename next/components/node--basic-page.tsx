import { DrupalNode } from "next-drupal";

import { FormattedText } from "@/components/formatted-text";

interface NodeBasicPageProps {
  node: DrupalNode;
}

export function NodeBasicPage({ node, ...props }: NodeBasicPageProps) {
  return (
    <article {...props}>
      <h1 className="text-left text-heading-md font-bold md:text-heading-lg">
        {node.title}
      </h1>
      {node.body?.processed && (
        <FormattedText
          className="my-8 text-justify text-md leading-xl text-gray-500 sm:text-lg"
          html={node.body?.processed}
        />
      )}
    </article>
  );
}
