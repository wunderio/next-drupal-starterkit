import YouTube from "react-youtube";

import { getYouTubeId } from "@/lib/utils";
import { Video } from "@/lib/zod/paragraph";

interface MediaVideoProps {
  media: Video["field_video"];
}

export function MediaVideo({ media }: MediaVideoProps) {
  if (!media?.field_media_oembed_video) {
    return null;
  }

  const options = {
    width: "100%",
    height: "100%",
  };

  const videoId = getYouTubeId(media.field_media_oembed_video);
  return (
    <YouTube
      className="aspect-h-9 aspect-w-16"
      videoId={videoId}
      opts={options}
    />
  );
}
