import { Suspense } from "react";

import { ArticlesListing } from "@/components/article/articles-listing";
import { HeadingParagraph } from "@/components/heading--paragraph";
import { LoadingSpinner } from "@/components/loading-spinner";
import type { FragmentParagraphListingArticleFragment } from "@/lib/gql/graphql";

export function ParagraphListingArticles({
  paragraph,
}: {
  paragraph: FragmentParagraphListingArticleFragment;
}) {
  return (
    <section data-paragraph={paragraph.__typename}>
      {paragraph.paragraphListingArticleHeading && (
        <HeadingParagraph>
          {paragraph.paragraphListingArticleHeading}
        </HeadingParagraph>
      )}
      <Suspense fallback={<LoadingSpinner />}>
        <ArticlesListing key={paragraph.id} limit={paragraph.limit} />
      </Suspense>
    </section>
  );
}
