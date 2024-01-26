import { graphql } from "@/lib/gql";

export const FRAGMENT_PARAGRAPH_UNION = graphql(`
  fragment FragmentParagraphUnion on ParagraphInterface {
    __typename
    id
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
    links {
      ...FragmentLink
    }
  }
`);

export const FRAGMENT_PARAGRAPH_IMAGE = graphql(`
  fragment FragmentParagraphImage on ParagraphImage {
    image {
      ...FragmentMediaUnion
    }
  }
`);

export const FRAGMENT_PARAGRAPH_VIDEO = graphql(`
  fragment FragmentParagraphVideo on ParagraphVideo {
    video {
      ...FragmentMediaUnion
    }
  }
`);

export const FRAGMENT_PARAGRAPH_FILE_ATTACHMENTS = graphql(`
  fragment FragmentParagraphFileAttachments on ParagraphFileAttachment {
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
