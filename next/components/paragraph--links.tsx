import Link from "next/link";
import { Key } from "react";
import { ParagraphProps } from "components/paragraph";

type Link = {
  full_url: string;
  url: string;
  title: string;
};

export function ParagraphLinks({ paragraph }: ParagraphProps) {
  return (
    <ul className="list-disc p-2">
      {paragraph.field_links.map((link: Link, id: Key) => (
        <li key={id}>
          <Link className="text-sm text-wunderpurple-600" href={link.full_url}>
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
