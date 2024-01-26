import { Paragraph } from "@/components/paragraph/paragraph";
import { PageType, ParagraphType } from "@/types/graphql";

export function NodePage({ page }: { page: PageType }) {
  return (
    <div className="grid gap-4">
      {page.contentElements?.map((paragraph: ParagraphType) => (
        <Paragraph key={paragraph.id} paragraph={paragraph} />
      ))}
    </div>
  );
}
