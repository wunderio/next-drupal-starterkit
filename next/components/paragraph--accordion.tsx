import clsx from "clsx";

import { FormattedText } from "@/components/formatted-text";
import { HeadingParagraph } from "@/components/heading--paragraph";
import { Paragraph } from "@/components/paragraph";
import { LinkButtonWithStyles } from "@/components/paragraph--hero";
import { Accordion as ParagraphAccordion } from "@/lib/zod/paragraph";
import ArrowIcon from "@/styles/icons/arrow-down.svg";

import { Accordion } from "@/wunder-component-library/accordion";

export function ParagraphAccordion({
  paragraph,
}: {
  paragraph: ParagraphAccordion;
}) {
  return (
    <>
      {paragraph.field_heading && (
        <HeadingParagraph>{paragraph.field_heading}</HeadingParagraph>
      )}
      {paragraph.field_formatted_text && (
        <FormattedText
          html={paragraph.field_formatted_text.processed}
          className={clsx(
            "text-left text-md/xl text-scapaflow sm:text-lg",
            paragraph.field_heading && "mt-4"
          )}
        />
      )}
      {paragraph.field_primary_link && (
        <LinkButtonWithStyles
          href={paragraph.field_primary_link.full_url}
          className="text-base mr-4 inline-flex max-w-sm px-5 py-3"
          variant="primary"
        >
          {paragraph.field_primary_link.title}
          <ArrowIcon aria-hidden className="bg:white ml-3 h-6 w-6 -rotate-90" />
        </LinkButtonWithStyles>
      )}
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
    </>
  );
}
