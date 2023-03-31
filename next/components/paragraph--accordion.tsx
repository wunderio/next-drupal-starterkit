import { Paragraph } from "@/components/paragraph";
import { Accordion as ParagraphAccordion } from "@/lib/zod/paragraph";

import { Accordion } from "@/wunder-component-library/accordion";

export function ParagraphAccordion({
  paragraph,
}: {
  paragraph: ParagraphAccordion;
}) {
  return (
    <Accordion
      heading={paragraph.field_heading}
      items={paragraph.field_accordion_items?.map((item) => ({
        id: item.id,
        heading: item.field_heading,
        content: (
          <div className="grid gap-4">
            {item.field_content_elements?.map((paragraph) => (
              <Paragraph key={paragraph.id} paragraph={paragraph} />
            ))}
          </div>
        ),
      }))}
    />
  );
}
