import clsx from "clsx";

import { FormattedText } from "@/components/formatted-text";
import { Heading } from "@/components/heading";
import { FormattedText as FormattedTextType } from "@/lib/zod/paragraph";

export function ParagraphText({ paragraph }: { paragraph: FormattedTextType }) {
  return (
    <>
      {paragraph.field_heading && <Heading>{paragraph.field_heading}</Heading>}
      <FormattedText
        html={paragraph.field_formatted_text.processed}
        className={clsx(
          "text-left text-md/xl text-scapaflow sm:text-lg",
          paragraph.field_heading && "mt-4"
        )}
      />
    </>
  );
}
