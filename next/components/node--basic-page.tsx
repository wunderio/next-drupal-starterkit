import { DrupalNode } from "next-drupal";

import { FormattedText } from "@/components/formatted-text";
import { HeadingPage } from "@/components/heading--page";

interface NodeBasicPageProps {
  node: DrupalNode;
}

export function NodeBasicPage({ node, ...props }: NodeBasicPageProps) {
  return (
    <article {...props}>
      <HeadingPage>{node.title}</HeadingPage>
      {node.body?.processed && (
        <FormattedText
          className="my-8 text-justify text-md leading-xl text-gray-500 sm:text-lg"
          html={node.body?.processed}
        />
      )}
    </article>
  );
}
