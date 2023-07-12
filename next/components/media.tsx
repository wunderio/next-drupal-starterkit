import React from "react";

import { MediaFileAttachments } from "@/components/media--file-attachments";
import { MediaImage } from "@/components/media--image";
import { MediaVideo } from "@/components/media--video";
import { FileAttachments, Image, Video } from "@/lib/zod/paragraph";

interface MediaProps {
  media?:
    | Image["field_image"]
    | Video["field_video"]
    | FileAttachments["field_file_attachments"];
  priority?: boolean;
}

export function Media({ media, ...props }: MediaProps) {
  if (!media) {
    return null;
  }

  function isFileAttachments(
    media: MediaProps["media"],
  ): media is FileAttachments["field_file_attachments"] {
    return Array.isArray(media) && media[0]?.type === "media--document";
  }

  // Special case for file attachments:
  if (isFileAttachments(media)) {
    return <MediaFileAttachments mediaItems={media} {...props} />;
  }

  // For other media types:
  switch (media.type) {
    case "media--image":
      return <MediaImage media={media} {...props} />;
    case "media--remote_video":
      return <MediaVideo media={media} {...props} />;
    default:
      return null;
  }
}
