import clsx from "clsx";

import { FormattedText } from "@/components/formatted-text";
import { HeadingParagraph } from "@/components/heading--paragraph";
import { Media } from "@/components/media";
import { FileAttachments } from "@/lib/zod/paragraph";
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
