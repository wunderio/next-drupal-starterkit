import { FormattedText } from "@/components/formatted-text";
import { HeadingParagraph } from "@/components/heading--paragraph";
import { Media } from "@/components/media";
import type { FragmentParagraphFileAttachmentsFragment } from "@/lib/gql/graphql";
import { cn } from "@/lib/utils";

// TODO: Translations
export function ParagraphFileAttachments({
  paragraph,
}: {
  paragraph: FragmentParagraphFileAttachmentsFragment;
}) {
  return (
    <section
      className="relative h-full p-4 transition-all border rounded bg-background border-border hover:shadow-md"
      data-paragraph={paragraph.__typename}
    >
      {paragraph.fileAttachmentsParagraphHeading && (
        <HeadingParagraph>
          {paragraph.fileAttachmentsParagraphHeading}
        </HeadingParagraph>
      )}
      {paragraph.fileAttachmentsParagraphFormattedText && (
        <FormattedText
          html={paragraph.fileAttachmentsParagraphFormattedText.processed}
          className={cn(
            "text-left text-md sm:text-lg",
            paragraph.fileAttachmentsParagraphHeading && "mt-4",
          )}
        />
      )}

      <ul className="space-y-2 list-inside" aria-label={"downloadable-files"}>
        {paragraph.fileAttachments.map((attachment) => (
          <li
            key={attachment.id}
            className="w-full gap-1 hover:text-primary-600"
          >
            <Media media={attachment} />
          </li>
        ))}
      </ul>
    </section>
  );
}
