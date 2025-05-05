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
            className="group flex min-h-[6em] cursor-pointer justify-between rounded border border-border p-8 text-lg"
          >
            {link.title}
            <ArrowIcon
              aria-hidden
              className="text-primary-600 h-6 w-6 -rotate-90 transition-transform duration-500 group-hover:translate-x-2"
            />
          </Link>
        ))}
      </ul>
    </section>
  );
}
