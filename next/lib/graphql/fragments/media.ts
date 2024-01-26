import { graphql } from "@/lib/gql";

export const FRAGMENT_MEDIA_UNION = graphql(`
  fragment FragmentMediaUnion on MediaInterface {
    __typename
    id
    ...FragmentMediaAudio
    ...FragmentMediaDocument
    ...FragmentMediaImage
    ...FragmentMediaRemoteVideo
    ...FragmentMediaVideo
  }
`);

export const FRAGMENT_MEDIA_AUDIO = graphql(`
  fragment FragmentMediaAudio on MediaAudio {
    name
    mediaAudioFile {
      ...FragmentFile
    }
  }
`);

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

export const FRAGMENT_MEDIA_IMAGE = graphql(`
  fragment FragmentMediaImage on MediaImage {
    name
    mediaImage {
      ...FragmentImage
    }
  }
`);

export const FRAGMENT_MEDIA_REMOTE_VIDEO = graphql(`
  fragment FragmentMediaRemoteVideo on MediaRemoteVideo {
    name
    mediaOembedVideo
  }
`);
