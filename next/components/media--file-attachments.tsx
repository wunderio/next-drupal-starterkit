import { useTranslation } from "next-i18next";

import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatFileSizeInBytes, getFileType } from "@/lib/utils";
import { FileAttachments } from "@/lib/zod/paragraph";
import ListIcon from "@/styles/icons/list.svg";
import PdfIcon from "@/styles/icons/pdf.svg";
import TextIcon from "@/styles/icons/text-doc.svg";

interface MediaFileAttachmentsProps {
  mediaItems: FileAttachments["field_file_attachments"];
}

const getIcon = (fileType: string) => {
  switch (fileType) {
    case "pdf":
      return (
        <PdfIcon
          className="mr-1.5 h-4 w-4 flex-shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          aria-hidden
        />
      );
    case "docx":
    case "txt":
    case "odt":
    case "rtf":
      return (
        <TextIcon
          className="mr-1.5 h-4 w-4 flex-shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          aria-hidden
        />
      );
    default:
      return (
        <ListIcon
          className="mr-1.5 h-4 w-4 flex-shrink-0 text-primary-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden
        />
      );
  }
};

export function MediaFileAttachments({
  mediaItems,
  ...props
}: MediaFileAttachmentsProps) {
  const { t } = useTranslation();
  if (mediaItems.length === 0) {
    return null;
  }

  return (
    <>
      <ul
        {...props}
        className="list-inside space-y-2"
        aria-label={t("downloadable-files")}
      >
        {mediaItems.map((mediaItem) => (
          <li
            key={mediaItem.id}
            className="gap-1 w-full hover:text-primary-600"
          >
            <a
              href={absoluteUrl(mediaItem.field_media_document.uri.url)}
              className="flex items-center"
              download
            >
              {getIcon(getFileType(mediaItem.field_media_document.uri.url))}
              <span className="sr-only">{t("download")}</span>
              <span className="text-xs mr-2">
                {mediaItem.field_media_document.filename}
              </span>
              <span className="text-xs mr-2">
                {formatFileSizeInBytes(mediaItem.field_media_document.filesize)}
              </span>
              <span className="text-xs">
                ({mediaItem.field_media_document.filemime})
              </span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
