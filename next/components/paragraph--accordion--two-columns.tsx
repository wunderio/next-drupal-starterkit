import Link from "next/link";
import clsx from "clsx";

import { FormattedText } from "@/components/formatted-text";
import { HeadingParagraph } from "@/components/heading--paragraph";
import { Paragraph } from "@/components/paragraph";
import { Accordion as ParagraphAccordion } from "@/lib/zod/paragraph";
import ArrowIcon from "@/styles/icons/arrow-down.svg";

import { Accordion } from "@/ui/accordion";
import { buttonVariants } from "@/ui/button";

export function ParagraphAccordionTwoColumns({
  paragraph,
}: {
  paragraph: ParagraphAccordion;
}) {
  return (
    <>
      {paragraph.field_heading && (
        <HeadingParagraph>{paragraph.field_heading}</HeadingParagraph>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2">
        <div>
          {paragraph.field_formatted_text && (
            <div className="flex items-center justify-center">
              <FormattedText
                html={paragraph.field_formatted_text.processed}
                className={clsx(
                  "text-left text-md/xl text-scapaflow sm:text-lg",
                  paragraph.field_heading && "mt-4",
                )}
              />
            </div>
          )}
          {paragraph.field_primary_link && (
            <div className="flex items-center justify-center py-3">
              <Link
                href={paragraph.field_primary_link.full_url}
                className={clsx(
                  buttonVariants({ variant: "primary" }),
                  "text-base mr-4 inline-flex max-w-sm px-5 py-3",
                )}
              >
                {paragraph.field_primary_link.title}
                <ArrowIcon aria-hidden className="ml-3 h-6 w-6 -rotate-90" />
              </Link>
            </div>
          )}
        </div>
        <div>
          <Accordion
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
        </div>
      </div>
    </>
  );
}
