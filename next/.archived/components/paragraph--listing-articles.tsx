import { ListingArticles } from "@/lib/zod/paragraph";

import { ArticlesListing } from "@/archived-components/articles-listing";
import { HeadingParagraph } from "@/archived-components/heading--paragraph";

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
