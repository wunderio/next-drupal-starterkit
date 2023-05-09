import Link from "next/link";
import clsx from "clsx";

import { FormattedText } from "@/components/formatted-text";
import { MediaImage } from "@/components/media--image";
import { Hero as HeroType } from "@/lib/zod/paragraph";
import ArrowIcon from "@/styles/icons/arrow-down.svg";

export function ParagraphHero({ paragraph }: { paragraph: HeroType }) {
  return (
    <>
      {paragraph.field_heading && <h1>{paragraph.field_heading}</h1>}
      <FormattedText
        html={paragraph.field_formatted_text.processed}
        className={clsx(
          "text-justify text-md/xl text-scapaflow sm:text-lg",
          paragraph.field_heading && "mt-4"
        )}
      />
      <MediaImage media={paragraph.field_image} priority />

      {paragraph.field_primary_link && (
        <Link
          role="listitem"
          href={paragraph.field_primary_link.full_url}
          className="relative min-h-[6em] cursor-pointer rounded border border-finnishwinter bg-primary-100 p-8 text-lg text-steelgray hover:bg-primary-200"
        >
          {paragraph.field_primary_link.title}
          <ArrowIcon
            aria-hidden
            className="absolute right-2 top-1/4 h-6 w-6 -rotate-90 text-primary-600"
          />
        </Link>
      )}

      {paragraph.field_secondary_link && (
        <Link
          role="listitem"
          href={paragraph.field_secondary_link.full_url}
          className="relative min-h-[6em] cursor-pointer rounded border border-finnishwinter bg-primary-100 p-8 text-lg text-steelgray hover:bg-primary-200"
        >
          {paragraph.field_secondary_link.title}
          <ArrowIcon
            aria-hidden
            className="absolute right-2 top-1/4 h-6 w-6 -rotate-90 text-primary-600"
          />
        </Link>
      )}
    </>
  );
}
