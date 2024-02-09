import Link from "next/link";

import type { FragmentParagraphLinkFragment } from "@/lib/gql/graphql";
import ArrowIcon from "@/styles/icons/arrow-down.svg";

export function ParagraphLinks({
  paragraph,
}: {
  paragraph: FragmentParagraphLinkFragment;
}) {
  if (!paragraph.links?.length) return null;

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {paragraph.links.map((link, index) => (
        <Link
          key={index}
          role="listitem"
          href={link.url}
          className="relative min-h-[6em] cursor-pointer rounded border border-finnishwinter bg-primary-100 p-8 text-lg text-steelgray hover:bg-primary-200"
        >
          {link.title}
          <ArrowIcon
            aria-hidden
            className="absolute right-2 top-1/4 h-6 w-6 -rotate-90 text-primary-600"
          />
        </Link>
      ))}
    </ul>
  );
}
