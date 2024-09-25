import { FormattedText } from "@/components/formatted-text";
import { HeadingParagraph } from "@/components/heading--paragraph";
import type { FragmentParagraphFormattedTextFragment } from "@/lib/gql/graphql";
import { cn } from "@/lib/utils";

export function ParagraphText({
  paragraph,
}: {
  paragraph: FragmentParagraphFormattedTextFragment;
}) {
  return (
    <>
      {paragraph.formattedTextHeading && (
        <HeadingParagraph>{paragraph.formattedTextHeading}</HeadingParagraph>
      )}
      <FormattedText
        html={paragraph.formattedTextText.processed}
        className={cn(
          "text-left text-md/xl text-scapaflow sm:text-lg",
          paragraph.formattedTextHeading && "mt-4",
        )}
      />
    </>
  );
}
