import React from "react";

import { MediaDocument } from "@/components/media/media--document";
import { MediaImage } from "@/components/media/media--image";
import { MediaVideo } from "@/components/media/media--video";
import { FragmentMediaUnionFragment } from "@/lib/gql/graphql";

export function Media({ media }: { media: FragmentMediaUnionFragment }) {
  if (!media) {
    return null;
  }
  switch (media.__typename) {
    case "MediaImage":
      return <MediaImage media={media} />;
    case "MediaRemoteVideo":
      return <MediaVideo media={media} />;
    case "MediaDocument":
      return <MediaDocument media={media} />;
    default: {
      console.log(
        `components/media/index.tsx: GraphQL media type not yet implemented: ${media.__typename}`,
      );
      return null;
    }
  }
}
