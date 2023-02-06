import YouTube from "react-youtube";

import { MediaProps } from "@/components/media";
import { getYouTubeId } from "@/lib/utils";

export function MediaVideo({ media }: MediaProps) {
  if (!media?.field_media_oembed_video) {
    return null;
  }

  const options = {
    width: "100%",
    height: "100%",
  };

  const videoId = getYouTubeId(media.field_media_oembed_video);
  return (
    <div className="aspect-w-16 aspect-h-9">
      <YouTube videoId={videoId} opts={options} />
    </div>
  );
}
