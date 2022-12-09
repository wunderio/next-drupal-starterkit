import Image, { ImageProps } from "next/image";
import { MediaProps } from "components/media";
import { absoluteUrl } from "lib/utils";

interface MediaImageProps extends MediaProps, Partial<ImageProps> {}

export function MediaImage({
  media,
  layout = "responsive",
  objectFit,
  width,
  height,
  ...props
}: MediaImageProps) {
  const image = media?.field_media_image;

  if (!image) {
    return null;
  }

  return (
    <Image
      src={absoluteUrl(image.uri.url)}
      layout={layout}
      objectFit={objectFit}
      width={width || image.resourceIdObjMeta.width}
      height={height || image.resourceIdObjMeta.height}
      alt={image.resourceIdObjMeta.alt || "Image"}
      title={image.resourceIdObjMeta.title}
      {...props}
    />
  );
}
