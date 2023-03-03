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
    <div className="aspect-w-16 aspect-h-9 mb-7">
      <YouTube videoId={videoId} opts={options} />
    </div>
  );
}
