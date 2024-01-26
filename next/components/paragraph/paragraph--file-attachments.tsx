import { useTranslation } from "next-i18next";
import clsx from "clsx";

import { FormattedText } from "@/components/formatted-text";
import { HeadingParagraph } from "@/components/heading--paragraph";
import { Media } from "@/components/media";
import type { FragmentParagraphFileAttachmentsFragment } from "@/lib/gql/graphql";
export function ParagraphFileAttachments({
  paragraph,
}: {
  paragraph: FragmentParagraphFileAttachmentsFragment;
}) {
  const { t } = useTranslation();
  return (
    <section className="relative h-full rounded border border-finnishwinter bg-white p-4 transition-all hover:shadow-md">
      {paragraph.fileAttachmentsParagraphHeading && (
        <HeadingParagraph>
          {paragraph.fileAttachmentsParagraphHeading}
        </HeadingParagraph>
      )}
      {paragraph.fileAttachmentsParagraphFormattedText && (
        <FormattedText
          html={paragraph.fileAttachmentsParagraphFormattedText.processed}
          className={clsx(
            "text-left text-md/xl text-scapaflow sm:text-lg",
            paragraph.fileAttachmentsParagraphHeading && "mt-4",
          )}
        />
      )}

      <ul
        className="list-inside space-y-2"
        aria-label={t("downloadable-files")}
      >
        {paragraph.fileAttachments.map((attachment) => (
          <li
            key={attachment.id}
            className="gap-1 w-full hover:text-primary-600"
          >
            <Media media={attachment} />
          </li>
        ))}
      </ul>
    </section>
  );
}
