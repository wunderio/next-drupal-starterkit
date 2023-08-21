import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatFileSizeInBytes, getFileType } from "@/lib/utils";
import { FileAttachments } from "@/lib/zod/paragraph";
import ListIcon from "@/styles/icons/list.svg";
// import PdfIcon from "@/styles/icons/pdf.svg";
// import TextIcon from "@/styles/icons/text-doc.svg";

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

/*
interface MediaFileAttachmentsProps {
  media: FileAttachments["field_file_attachments"];
  className?: string;
}

export function MediaFileAttachments({
  media,
  className,
  ...props
}: MediaFileAttachmentsProps) {
  if (media.length === 0) {
    return null;
  }

  const getIcon = (fileType: string) => {
    switch (fileType) {
      case "pdf":
        return (
          <PdfIcon
            className="mb-2 flex h-12 w-12 flex-shrink-0 sm:mb-0 sm:mr-8"
            xmlns="http://www.w3.org/2000/svg"
          />
        );
      case "docx":
      case "txt":
      case "odt":
      case "rtf":
        return (
          <TextIcon
            className="mb-2 flex h-12 w-12 flex-shrink-0 sm:mb-0 sm:mr-8"
            xmlns="http://www.w3.org/2000/svg"
          />
        );
      default:
        return (
          <FileIcon
            className="mb-2 flex h-12 w-12  flex-shrink-0 sm:mb-0 sm:mr-8"
            xmlns="http://www.w3.org/2000/svg"
          />
        );
    }
  };

  return (
    <Container>
      <ul
        className={clsx(
          "w-full list-inside space-y-4 text-body-md text-black",
          className,
        )}
        {...props}
      >
        {media.map((mediaItem) => (
          <li
            key={mediaItem.id}
            className="flex min-h-[80px] items-center border-2 border-brand-10 hover:bg-brand-10"
          >
            <a
              href={absoluteUrlFastly(mediaItem.field_media_document.uri.url)}
              className="flex w-full flex-col items-center justify-between p-4 align-middle sm:flex-row sm:px-8 sm:py-4"
            >
              <div className="flex w-full flex-col items-center sm:flex-row">
                {getIcon(getFileType(mediaItem.field_media_document.uri.url))}
                <p className="mb-2 text-center text-body-sm sm:mb-0 sm:text-left sm:text-body-md">
                  {mediaItem.field_media_document.filename}{" "}
                  <span>
                    ({getFileType(mediaItem.field_media_document.uri.url)},{" "}
                    {formatFileSizeInBytes(
                      mediaItem.field_media_document.filesize,
                    )}
                    )
                  </span>
                </p>
              </div>
              <DownloadIcon
                className="mr-0 h-6 w-6 flex-shrink-0 sm:ml-4"
                xmlns="http://www.w3.org/2000/svg"
              />
            </a>
          </li>
        ))}
      </ul>
    </Container>
  );
}
*/