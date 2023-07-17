import NextImage, { ImageProps } from "next/image";

import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { Image } from "@/lib/zod/paragraph";

interface MediaImageProps extends Partial<ImageProps> {
  media: Image["field_image"];
}

export function MediaImage({
  media,
  width,
  height,
  ...props
}: MediaImageProps) {
  const image = media?.field_media_image;

  if (!image) {
    return null;
  }

  return (
    <NextImage
      src={absoluteUrl(image.uri.url)}
      width={width || image.resourceIdObjMeta.width}
      height={height || image.resourceIdObjMeta.height}
      alt={image.resourceIdObjMeta.alt || "Image"}
      title={image.resourceIdObjMeta.title}
      className="h-auto max-w-full object-cover"
      {...props}
    />
  );
}
