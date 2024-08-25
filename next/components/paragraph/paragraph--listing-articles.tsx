import { HeadingParagraph } from "@/components/heading--paragraph";
import type { FragmentParagraphListingArticleFragment } from "@/lib/gql/graphql";
import { ArticlesListing } from "../article/articles-listing";

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
      <ArticlesListing key={paragraph.id} limit={paragraph.limit} />
    </>
  );
}
