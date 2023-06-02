import { absoluteUrl } from "@/lib/utils";
import { FileAttachments } from "@/lib/zod/paragraph";

interface MediaFileAttachmentsProps {
  mediaItems: FileAttachments["field_file_attachments"];
}

export function MediaFileAttachments({
  mediaItems,
  ...props
}: MediaFileAttachmentsProps) {
  if (mediaItems.length === 0) {
    return null;
  }

  return (
    <ul {...props}>
      {mediaItems.map((mediaItem) => (
        <li key={mediaItem.id}>
          <a href={absoluteUrl(mediaItem.field_media_document.uri.url)}>
            {mediaItem.field_media_document.filename}
          </a>
        </li>
      ))}
    </ul>
  );
}
