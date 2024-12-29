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
      className="relative h-full rounded border border-border bg-background p-4 transition-all hover:shadow-md"
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
            "text-md text-left sm:text-lg",
            paragraph.fileAttachmentsParagraphHeading && "mt-4",
          )}
        />
      )}

      <ul className="list-inside space-y-2" aria-label={"downloadable-files"}>
        {paragraph.fileAttachments.map((attachment) => (
          <li
            key={attachment.id}
            className="hover:text-primary-600 w-full gap-1"
          >
            <Media media={attachment} />
          </li>
        ))}
      </ul>
    </section>
  );
}
