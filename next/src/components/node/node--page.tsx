import { Paragraph } from "@/components/paragraph";
import type { FragmentParagraphUnionFragment } from "@/lib/gql/graphql";
import type { PageType } from "@/types/graphql";

export function NodePage({ page }: { page: PageType }) {
  return (
    <div className="grid gap-12">
      {page.contentElements?.map(
        (paragraph: FragmentParagraphUnionFragment) => (
          <Paragraph key={paragraph.id} paragraph={paragraph} />
        ),
      )}
    </div>
  );
}
