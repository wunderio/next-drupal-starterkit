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
    <section data-paragraph={paragraph.__typename}>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {paragraph.links.map((link, index) => (
          <Link
            key={index}
            role="listitem"
            href={link.url}
            className="min-h-[6em] cursor-pointer rounded border border-border p-8 text-lg flex justify-between group"
          >
            {link.title}
            <ArrowIcon
              aria-hidden
              className="w-6 h-6 transition-transform duration-500 -rotate-90 text-primary-600 group-hover:translate-x-2"
            />
          </Link>
        ))}
      </ul>
    </section>
  );
}
