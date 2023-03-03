import * as AccordionUI from "@radix-ui/react-accordion";

import { Paragraph } from "@/components/paragraph";
import { Accordion } from "@/lib/zod/paragraph";
import ChevronIcon from "@/styles/icons/chevron-down.svg";
import ListIcon from "@/styles/icons/list.svg";

export function ParagraphAccordion({ paragraph }: { paragraph: Accordion }) {
  return (
    <div className="relative mb-7 h-full rounded border bg-white p-4 transition-all hover:shadow-md">
      <h2 className="mb-4 text-heading-sm font-bold md:text-heading-md">
        {paragraph.field_heading}
      </h2>
      <AccordionUI.Root type="single" collapsible className="grid gap-2">
        {paragraph.field_accordion_items?.map((item) => (
          <AccordionUI.Item key={item.id} value={item.id}>
            <AccordionUI.Header>
              <AccordionUI.Trigger className="group flex w-full flex-row items-center justify-between gap-1 rounded border border-finnishwinter bg-white p-6 text-md text-black aria-expanded:rounded-b-none aria-expanded:bg-mischka md:gap-1.5 md:text-lg">
                <ListIcon
                  aria-hidden
                  className="shrink-0 text-wunderpurple-600"
                />
                <span className="mx-5 grow text-left">
                  {item.field_heading}
                </span>
                <ChevronIcon
                  aria-hidden
                  className="shrink-0 text-wunderpurple-600 group-aria-expanded:rotate-180"
                />
              </AccordionUI.Trigger>
            </AccordionUI.Header>
            <AccordionUI.Content className="rounded-b border border-t-0 border-finnishwinter bg-white p-6 text-md">
              {item.field_content_elements?.map((paragraph) => (
                <Paragraph key={paragraph.id} paragraph={paragraph} />
              ))}
            </AccordionUI.Content>
          </AccordionUI.Item>
        ))}
      </AccordionUI.Root>
    </div>
  );
}
