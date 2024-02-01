import { ArticlesListing } from "@/components/articles-listing";
import { HeadingParagraph } from "@/components/heading--paragraph";
import type { FragmentParagraphListingArticleFragment } from "@/lib/gql/graphql";

export function ParagraphListingArticles({
  paragraph,
}: {
  paragraph: FragmentParagraphListingArticleFragment;
}) {
  console.log(JSON.stringify(paragraph, null, 2));
  return (
    <>
      {paragraph.paragraphListingArticleHeading && (
        <HeadingParagraph>
          {paragraph.paragraphListingArticleHeading}
        </HeadingParagraph>
      )}
      <ArticlesListing listingId={paragraph.id} limit={paragraph.limit} />
    </>
  );
}
