import { ArticlesListing } from "@/components/articles-listing";
import { HeadingParagraph } from "@/components/heading--paragraph";
import { ListingArticles } from "@/lib/zod/paragraph";

export function ParagraphListingArticles({
  paragraph,
}: {
  paragraph: ListingArticles;
}) {
  return (
    <>
      {paragraph.field_heading && (
        <HeadingParagraph>{paragraph.field_heading}</HeadingParagraph>
      )}
      <ArticlesListing listingId={paragraph.id} limit={paragraph.field_limit} />
    </>
  );
}
