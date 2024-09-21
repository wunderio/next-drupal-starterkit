import { HeadingParagraph } from "@/components/heading--paragraph";
import type { FragmentParagraphListingArticleFragment } from "@/lib/gql/graphql";

import { ArticlesListing } from "../article/articles-listing";
import { Suspense } from "react";
import { LoadingSpinner } from "../loading-spinner";

export function ParagraphListingArticles({
  paragraph,
}: {
  paragraph: FragmentParagraphListingArticleFragment;
}) {
  return (
    <>
      {paragraph.paragraphListingArticleHeading && (
        <HeadingParagraph>
          {paragraph.paragraphListingArticleHeading}
        </HeadingParagraph>
      )}
      <Suspense fallback={<LoadingSpinner />}>
        <ArticlesListing key={paragraph.id} limit={paragraph.limit} />
      </Suspense>
    </>
  );
}
