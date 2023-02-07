import { DrupalMedia } from "next-drupal";

import { MediaImage } from "@/components/media--image";
import { MediaVideo } from "@/components/media--video";

const mediaTypes = {
  "media--image": MediaImage,
  "media--video": MediaVideo,
};

export interface MediaProps {
  media: DrupalMedia;
}

export function Media({ media, ...props }: MediaProps) {
  if (!media) {
    return null;
  }

  const Component = mediaTypes[media.type];

  if (!Component) {
    return null;
  }

  return <Component media={media} {...props} />;
}
