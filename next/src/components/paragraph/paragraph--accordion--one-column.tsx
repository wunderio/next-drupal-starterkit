import { FormattedText } from "@/components/formatted-text";
import { HeadingParagraph } from "@/components/heading--paragraph";
import { Paragraph } from "@/components/paragraph";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowLinkButton } from "@/components/ui/arrow-link-button";
import {
  FragmentParagraphAccordionFragment,
  FragmentParagraphAccordionItemFragment,
  FragmentParagraphUnionFragment,
} from "@/lib/gql/graphql";
import { cn } from "@/lib/utils";

export function ParagraphAccordionOneColumn({
  paragraph,
}: {
  paragraph: FragmentParagraphAccordionFragment;
}) {
  return (
    <section data-paragraph={paragraph.__typename}>
      {paragraph.heading && (
        <HeadingParagraph>{paragraph.heading}</HeadingParagraph>
      )}

      {paragraph.accordionFormattedText && (
        <FormattedText
          html={paragraph.accordionFormattedText.processed}
          className={cn(
            "text-left text-xl sm:text-lg",
            paragraph.heading && "mt-4",
          )}
        />
      )}
      {paragraph.primaryLink && (
        <ArrowLinkButton
          href={paragraph.primaryLink.url}
          className="mt-4 max-w-sm px-10 py-3"
        >
          {paragraph.primaryLink.title}
        </ArrowLinkButton>
      )}

      <Accordion type="single" collapsible className="mt-4">
        {paragraph.accordionItems?.map(
          (item: FragmentParagraphAccordionItemFragment) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger>{item.accordionItemHeading}</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4">
                  {item.contentElements?.map(
                    (paragraph: FragmentParagraphUnionFragment) => (
                      <Paragraph key={paragraph.id} paragraph={paragraph} />
                    ),
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ),
        )}
      </Accordion>
    </section>
  );
}
