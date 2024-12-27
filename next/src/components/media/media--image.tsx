import NextImage from "next/image";

import type { FragmentMediaImageFragment } from "@/lib/gql/graphql";

type MediaImageProps = {
  media: FragmentMediaImageFragment;
  priority?: boolean;
};

export function MediaImage({ media, priority }: MediaImageProps) {
  if (!media) {
    return null;
  }

  const { url, width, height, alt, title } = media.mediaImage;

  return (
    <NextImage
      src={url}
      width={width}
      height={height}
      alt={alt || "Image"}
      title={title || ""}
      priority={priority}
      className="h-auto max-w-full object-cover"
    />
  );
}
