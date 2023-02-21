import Link from "next/link";

import { Links } from "@/lib/zod/paragraph";

export function ParagraphLinks({ paragraph }: { paragraph: Links }) {
  return (
    <ul className="list-disc p-2">
      {paragraph.field_links.map((link, index) => (
        <li key={index}>
          <Link
            className="text-md text-wunderpurple-600 hover:underline"
            href={link.full_url}
          >
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
