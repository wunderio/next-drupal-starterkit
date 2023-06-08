import { Media } from "@/components/media";
import { FileAttachments } from "@/lib/zod/paragraph";

export function ParagraphFileAttachments({
  paragraph,
}: {
  paragraph: FileAttachments;
}) {
  return <Media media={paragraph.field_file_attachments} />;
}
