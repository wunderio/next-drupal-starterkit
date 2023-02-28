import * as AccordionUI from "@radix-ui/react-accordion";

import { FormattedText } from "@/components/formatted-text";
import { Accordion } from "@/lib/zod/paragraph";

export function ParagraphAccordion({ paragraph }: { paragraph: Accordion }) {
  return (
    <div className="relative mb-7 h-full rounded border bg-white p-4 transition-all hover:shadow-md">
      <h2 className="text-heading-sm font-bold md:text-heading-md">
        {paragraph.field_heading}
      </h2>
      <AccordionUI.Root type="single" collapsible>
        {paragraph.field_accordion_items &&
          paragraph.field_accordion_items.map((item) => (
            <AccordionUI.Item
              className="rounded border"
              key={item.id}
              value={item.id}
            >
              <AccordionUI.Header className="bg-wunderpurple-400 p-2 text-lg text-white">
                <AccordionUI.Trigger className="h-full">
                  {item.field_heading}
                </AccordionUI.Trigger>
              </AccordionUI.Header>
              <AccordionUI.Content className="text-m bg-wunderpurple-50 p-2">
                <FormattedText html={item.field_formatted_text.processed} />
              </AccordionUI.Content>
            </AccordionUI.Item>
          ))}
      </AccordionUI.Root>
    </div>
  );
}
