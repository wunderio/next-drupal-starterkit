import { ParagraphAccordionOneColumn } from "@/components/paragraph--accordion--one-column";
import { ParagraphAccordionTwoColumns } from "@/components/paragraph--accordion--two-columns";
import { Accordion as ParagraphAccordion } from "@/lib/zod/paragraph";
export function ParagraphAccordion({
  paragraph,
}: {
  paragraph: ParagraphAccordion;
}) {
  switch (paragraph.field_accordion_layout) {
    case "one_column": {
      return <ParagraphAccordionOneColumn paragraph={paragraph} />;
    }
    case "two_columns": {
      return <ParagraphAccordionTwoColumns paragraph={paragraph} />;
    }

    default:
      return null;
  }
}
