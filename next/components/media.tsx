import { MediaImage } from "@/components/media--image";
import { MediaVideo } from "@/components/media--video";
import { Image, Video } from "@/lib/zod/paragraph";

interface MediaProps {
  media: Image["field_image"] | Video["field_video"];
}

export function Media({ media, ...props }: MediaProps) {
  if (!media) {
    return null;
  }

  switch (media.type) {
    case "media--image":
      return <MediaImage media={media} {...props} />;
    case "media--remote_video":
      return <MediaVideo media={media} {...props} />;
    default:
      return null;
  }
}
