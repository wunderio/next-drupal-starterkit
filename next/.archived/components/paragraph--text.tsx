import clsx from "clsx";

import { FormattedText as FormattedTextType } from "@/lib/zod/paragraph";

import { FormattedText } from "@/archived-components/formatted-text";
import { HeadingParagraph } from "@/archived-components/heading--paragraph";

export function ParagraphText({ paragraph }: { paragraph: FormattedTextType }) {
  return (
    <>
      {paragraph.field_heading && (
        <HeadingParagraph>{paragraph.field_heading}</HeadingParagraph>
      )}
      <FormattedText
        html={paragraph.field_formatted_text.processed}
        className={clsx(
          "text-left text-md/xl text-scapaflow sm:text-lg",
          paragraph.field_heading && "mt-4",
        )}
      />
    </>
  );
}
