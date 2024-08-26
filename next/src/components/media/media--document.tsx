import { getTranslations } from "next-intl/server";

import type { FragmentMediaDocumentFragment } from "@/lib/gql/graphql";
import { formatFileSizeInBytes } from "@/lib/utils";
import ListIcon from "@/styles/icons/list.svg";
import PdfIcon from "@/styles/icons/pdf.svg";
import TextIcon from "@/styles/icons/text-doc.svg";

const getIcon = (fileType: string) => {
  switch (fileType) {
    case "application/pdf":
      return (
        <PdfIcon
          className="mr-1.5 h-4 w-4 flex-shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          aria-hidden
        />
      );
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    case "application/msword":
    case "application/vnd.oasis.opendocument.text":
    case "application/rtf":
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

export async function MediaDocument({
  media,
}: {
  media: FragmentMediaDocumentFragment;
}) {
  const t = await getTranslations();
  if (!media) {
    return null;
  }

  return (
    <a
      href={media.mediaDocumentFile.url}
      className="flex items-center"
      download
    >
      {getIcon(media.mediaDocumentFile.mime)}
      <span className="sr-only">{t("download")}</span>
      <span className="mr-2 text-xs">{media.mediaDocumentFile.name}</span>
      <span className="mr-2 text-xs">
        {formatFileSizeInBytes(media.mediaDocumentFile.size)}
      </span>
      <span className="text-xs">({media.mediaDocumentFile.mime})</span>
    </a>
  );
}
