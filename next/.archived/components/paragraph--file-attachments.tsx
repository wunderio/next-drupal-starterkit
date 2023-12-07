import clsx from "clsx";

import { FileAttachments } from "@/lib/zod/paragraph";

import { FormattedText } from "@/archived-components/formatted-text";
import { HeadingParagraph } from "@/archived-components/heading--paragraph";
import { Media } from "@/archived-components/media";
export function ParagraphFileAttachments({
  paragraph,
}: {
  paragraph: FileAttachments;
}) {
  return (
    <section className="relative h-full rounded border border-finnishwinter bg-white p-4 transition-all hover:shadow-md">
      {paragraph.field_heading && (
        <HeadingParagraph>{paragraph.field_heading}</HeadingParagraph>
      )}
      {paragraph.field_formatted_text && (
        <FormattedText
          html={paragraph.field_formatted_text.processed}
          className={clsx(
            "text-left text-md/xl text-scapaflow sm:text-lg",
            paragraph.field_heading && "mt-4",
          )}
        />
      )}

      <Media media={paragraph.field_file_attachments} />
    </section>
  );
}
