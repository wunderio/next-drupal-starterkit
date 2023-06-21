import * as AccordionUI from "@radix-ui/react-accordion";

import ChevronIcon from "@/styles/icons/chevron-down.svg";
import ListIcon from "@/styles/icons/list.svg";

interface AccordionProps {
  heading?: string | React.ReactNode;
  items: Array<{
    id: string;
    heading: string | React.ReactNode;
    content: React.ReactNode;
  }>;
}
export function Accordion({ heading, items }: AccordionProps) {
  return (
    <div className="relative h-full rounded border border-finnishwinter bg-white p-4 transition-all hover:shadow-md">
      {heading && (
        <h2 className="mb-4 text-heading-sm font-bold md:text-heading-md">
          {heading}
        </h2>
      )}
      <AccordionUI.Root type="single" collapsible className="grid gap-4">
        {items?.map((item) => (
          <AccordionUI.Item key={item.id} value={item.id}>
            <AccordionUI.Header>
              <AccordionUI.Trigger className="group flex w-full flex-row items-center justify-between gap-1 rounded border border-finnishwinter bg-white p-6 text-md text-steelgray aria-expanded:rounded-b-none aria-expanded:bg-mischka md:gap-1.5 md:text-lg">
                <ListIcon
                  aria-hidden
                  className="h-6 w-6 shrink-0 text-primary-600"
                />
                <span className="mx-5 grow text-left">{item.heading}</span>
                <ChevronIcon
                  aria-hidden
                  className="h-6 w-6 shrink-0 text-primary-600 group-aria-expanded:rotate-180"
                />
              </AccordionUI.Trigger>
            </AccordionUI.Header>
            <AccordionUI.Content className="rounded-b border border-t-0 border-finnishwinter bg-white p-6 text-md">
              {item.content}
            </AccordionUI.Content>
          </AccordionUI.Item>
        ))}
      </AccordionUI.Root>
    </div>
  );
}
