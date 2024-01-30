import YouTube from "react-youtube";

import type { FragmentMediaRemoteVideoFragment } from "@/lib/gql/graphql";

export function MediaVideo({
  media,
}: {
  media: FragmentMediaRemoteVideoFragment;
}) {
  if (!media) {
    return null;
  }

  const options = {
    width: "100%",
    height: "100%",
  };

  const videoId = getYouTubeId(media.mediaOembedVideo);
  return (
    <YouTube
      className="aspect-h-9 aspect-w-16"
      videoId={videoId}
      opts={options}
    />
  );
}

/**
 * Gets a youtube id from a youtube url
 * Taken from https://gist.github.com/takien/4077195
 */
function getYouTubeId(url: string) {
  const arr = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return undefined !== arr[2] ? arr[2].split(/[^\w-]/i)[0] : arr[0];
}
