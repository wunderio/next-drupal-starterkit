import Link from "next/link";

import { FormattedText } from "@/components/formatted-text";
import { HeadingParagraph } from "@/components/heading--paragraph";
import { Paragraph } from "@/components/paragraph";
import {
  FragmentParagraphAccordionFragment,
  FragmentParagraphAccordionItemFragment,
  FragmentParagraphUnionFragment,
} from "@/lib/gql/graphql";
import { cn } from "@/lib/utils";
import ArrowIcon from "@/styles/icons/arrow-down.svg";

import { Accordion } from "@/ui/accordion";
import { buttonVariants } from "@/ui/button";

export function ParagraphAccordionTwoColumns({
  paragraph,
}: {
  paragraph: FragmentParagraphAccordionFragment;
}) {
  return (
    <>
      {paragraph.heading && (
        <HeadingParagraph>{paragraph.heading}</HeadingParagraph>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2">
        <div>
          {paragraph.accordionFormattedText && (
            <div className="flex items-center justify-center">
              <FormattedText
                html={paragraph.accordionFormattedText.processed}
                className={cn(
                  "text-left text-md/xl text-scapaflow sm:text-lg",
                  paragraph.heading && "mt-4",
                )}
              />
            </div>
          )}
          {paragraph.primaryLink && (
            <div className="flex items-center justify-center py-3">
              <Link
                href={paragraph.primaryLink.url}
                className={cn(
                  buttonVariants({ variant: "primary" }),
                  "text-base mr-4 inline-flex max-w-sm px-5 py-3",
                )}
              >
                {paragraph.primaryLink.title}

                <ArrowIcon className="w-6 h-6 ml-3 -rotate-90" aria-hidden />
              </Link>
            </div>
          )}
        </div>
        <div>
          <Accordion
            items={paragraph.accordionItems?.map(
              (item: FragmentParagraphAccordionItemFragment) => ({
                id: item.id,
                heading: item.accordionItemHeading,
                content: (
                  <div className="grid gap-4">
                    {item.contentElements?.map(
                      (paragraph: FragmentParagraphUnionFragment) => (
                        <Paragraph key={paragraph.id} paragraph={paragraph} />
                      ),
                    )}
                  </div>
                ),
              }),
            )}
          />
        </div>
      </div>
    </>
  );
}
