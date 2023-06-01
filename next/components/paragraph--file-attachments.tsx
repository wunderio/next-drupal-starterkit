import { FileAttachments } from "@/lib/zod/paragraph";

export function ParagraphFileAttachments({
  paragraph,
}: {
  paragraph: FileAttachments;
}) {
  return <p>{paragraph.type}</p>;
}
