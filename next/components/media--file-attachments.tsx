import { absoluteUrl } from "@/lib/utils";
import { FileAttachments } from "@/lib/zod/paragraph";
import ListIcon from "@/styles/icons/list.svg";

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
    <>
      <ul {...props} className="list-inside space-y-2">
        {mediaItems.map((mediaItem) => (
          <li key={mediaItem.id} className="flex items-center gap-1">
            <ListIcon
              className="mr-1.5 h-4 w-4 flex-shrink-0 text-primary-600"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            />
            <a
              href={absoluteUrl(mediaItem.field_media_document.uri.url)}
              target="_blank"
            >
              {mediaItem.field_media_document.filename}{" "}
            </a>
            <span className="text-xs">
              {formatFileSizeInBytes(mediaItem.field_media_document.filesize)}
            </span>
            <span className="text-xs">
              ({mediaItem.field_media_document.filemime})
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

function formatFileSizeInBytes(x?: number) {
  const units = [
    "bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB",
  ];

  let l = 0,
    n = parseInt(String(x), 10) || 0;

  while (n >= 1024 && ++l) {
    n = n / 1024;
  }

  return n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + units[l];
}
