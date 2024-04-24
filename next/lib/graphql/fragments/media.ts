import { graphql } from "gql.tada";

import { FRAGMENT_FILE, FRAGMENT_IMAGE } from "./fields";

export const FRAGMENT_MEDIA_AUDIO = graphql(
  `
    fragment FragmentMediaAudio on MediaAudio {
      name
      mediaAudioFile {
        ...FragmentFile
      }
    }
  `,
  [FRAGMENT_FILE],
);

export const FRAGMENT_MEDIA_VIDEO = graphql(`
  fragment FragmentMediaVideo on MediaVideo {
    name
    mediaVideoFile {
      ...FragmentFile
    }
  }
`);

export const FRAGMENT_MEDIA_DOCUMENT = graphql(`
  fragment FragmentMediaDocument on MediaDocument {
    name
    mediaDocumentFile: mediaDocument {
      ...FragmentFile
    }
  }
`);

export const FRAGMENT_MEDIA_IMAGE = graphql(
  `
    fragment FragmentMediaImage on MediaImage {
      name
      mediaImage {
        ...FragmentImage
      }
    }
  `,
  [FRAGMENT_IMAGE],
);

export const FRAGMENT_MEDIA_REMOTE_VIDEO = graphql(`
  fragment FragmentMediaRemoteVideo on MediaRemoteVideo {
    name
    mediaOembedVideo
  }
`);

export const FRAGMENT_MEDIA_UNION = graphql(
  `
    # This fragment needs to reference ALL the other defined media fragments in this file.
    # This fragment can be used in queries where a media entity type field is present.
    # Graphql-codegen will then generate a type with all possible variations of media
    # that we need to typecast media in the frontend.
    fragment FragmentMediaUnion on MediaInterface {
      __typename
      id
      ...FragmentMediaAudio
      ...FragmentMediaDocument
      ...FragmentMediaImage
      ...FragmentMediaRemoteVideo
      ...FragmentMediaVideo
    }
  `,
  [
    FRAGMENT_MEDIA_AUDIO,
    FRAGMENT_MEDIA_DOCUMENT,
    FRAGMENT_MEDIA_IMAGE,
    FRAGMENT_MEDIA_REMOTE_VIDEO,
    FRAGMENT_MEDIA_VIDEO,
  ],
);
