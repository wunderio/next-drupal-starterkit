import { graphql } from "@/lib/gql";

export const FRAGMENT_MEDIA_UNION = graphql(`
  fragment FragmentMediaUnion on MediaUnion {
    ...FragmentMediaAudio
    ...FragmentMediaDocument
    ...FragmentMediaImage
    ...FragmentMediaRemoteVideo
  }
`);

export const FRAGMENT_MEDIA_AUDIO = graphql(`
  fragment FragmentMediaAudio on MediaAudio {
    id
    name
    mediaAudioFile {
      ...FragmentFile
    }
  }
`);

export const FRAGMENT_MEDIA_DOCUMENT = graphql(`
  fragment FragmentMediaDocument on MediaDocument {
    id
    name
    mediaDocument {
      ...FragmentFile
    }
  }
`);

export const FRAGMENT_MEDIA_IMAGE = graphql(`
  fragment FragmentMediaImage on MediaImage {
    id
    mediaImage {
      ...FragmentImage
    }
  }
`);

export const FRAGMENT_MEDIA_REMOTE_VIDEO = graphql(`
  fragment FragmentMediaRemoteVideo on MediaRemoteVideo {
    id
    name
    mediaOembedVideo
  }
`);
