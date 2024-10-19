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
          className="relative min-h-[6em] cursor-pointer rounded border border-border bg-primary p-8 text-lg hover:bg-primary"
        >
          {link.title}

          <ArrowIcon className="w-6 h-6 ml-3 -rotate-90" aria-hidden />
        </Link>
      ))}
    </ul>
  );
}
