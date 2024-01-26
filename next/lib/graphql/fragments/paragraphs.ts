import { graphql } from "@/lib/gql";

export const FRAGMENT_PARAGRAPH_UNION = graphql(`
  fragment FragmentParagraphUnion on ParagraphUnion {
    __typename
    ...FragmentParagraphFormattedText
    ...FragmentParagraphLink
    ...FragmentParagraphImage
    ...FragmentParagraphVideo
    ...FragmentParagraphFileAttachments
    ...FragmentParagraphHero
  }
`);

export const FRAGMENT_PARAGRAPH_FORMATTED_TEXT = graphql(`
  fragment FragmentParagraphFormattedText on ParagraphFormattedText {
    __typename
    id
    # These fields are aliased here because they conflict with other instances
    # of the same field in other paragraph types where they have different
    # mandatory settings.
    formattedTextHeading: heading
    formattedTextText: formattedText {
      ...FragmentText
    }
  }
`);

export const FRAGMENT_PARAGRAPH_LINKS = graphql(`
  fragment FragmentParagraphLink on ParagraphLink {
    __typename
    id
    links {
      ...FragmentLink
    }
  }
`);

export const FRAGMENT_PARAGRAPH_IMAGE = graphql(`
  fragment FragmentParagraphImage on ParagraphImage {
    __typename
    id
    image {
      ...FragmentMediaUnion
    }
  }
`);

export const FRAGMENT_PARAGRAPH_VIDEO = graphql(`
  fragment FragmentParagraphVideo on ParagraphVideo {
    __typename
    id
    video {
      ...FragmentMediaUnion
    }
  }
`);

export const FRAGMENT_PARAGRAPH_FILE_ATTACHMENTS = graphql(`
  fragment FragmentParagraphFileAttachments on ParagraphFileAttachment {
    __typename
    id
    fileAttachmentsParagraphHeading: heading
    fileAttachmentsParagraphFormattedText: formattedText {
      ...FragmentText
    }
    fileAttachments {
      ...FragmentMediaUnion
    }
  }
`);

export const FRAGMENT_PARAGRAPH_HERO = graphql(`
  fragment FragmentParagraphHero on ParagraphHero {
    __typename
    id
    formattedText {
      ...FragmentText
    }
    image {
      ...FragmentMediaUnion
    }
    primaryLink {
      ...FragmentLink
    }
    secondaryLink {
      ...FragmentLink
    }
    paragraphHeroHeading: heading
  }
`);
