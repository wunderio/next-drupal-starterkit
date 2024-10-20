import { graphql } from "@/lib/gql";

export const FRAGMENT_PARAGRAPH_UNION = graphql(`
  # This fragment needs to reference ALL the other defined paragraph fragments in this file.
  # Graphql-codegen will then generate a type with all possible variations of paragraphs
  # that we need to typecast paragraphs in the frontend.
  # You should not use this fragment in queries, but instead add the specific fragments for
  # the paragraph types that are supported by each paragraph field.
  fragment FragmentParagraphUnion on ParagraphInterface {
    __typename
    id
    ...FragmentParagraphFormattedText
    ...FragmentParagraphLink
    ...FragmentParagraphImage
    ...FragmentParagraphVideo
    ...FragmentParagraphFileAttachments
    ...FragmentParagraphHero
    ...FragmentParagraphAccordion
    ...FragmentParagraphAccordionItem
    ...FragmentParagraphListingArticle
    ...FragmentParagraphLiftupArticle
  }
`);

export const FRAGMENT_PARAGRAPH_LIFTUP_ARTICLE = graphql(`
  fragment FragmentParagraphLiftupArticle on ParagraphLiftupsArticle {
    heading
    articles {
      ... on NodeArticle {
        ...FragmentArticleTeaser
      }
    }
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

export const FRAGMENT_PARAGRAPH_ACCORDION = graphql(`
  fragment FragmentParagraphAccordion on ParagraphAccordion {
    heading
    accordionLayout
    primaryLink {
      ...FragmentLink
    }
    accordionFormattedText: formattedText {
      ...FragmentText
    }
    accordionItems {
      ... on ParagraphInterface {
        __typename
        id
        # We include here only the paragraph types that can actually
        # be used as accordion items.
        ...FragmentParagraphAccordionItem
      }
    }
  }
`);

export const FRAGMENT_PARAGRAPH_ACCORDION_ITEM = graphql(`
  fragment FragmentParagraphAccordionItem on ParagraphAccordionItem {
    __typename
    id
    accordionItemHeading: heading
    accordionItemFormattedText: formattedText {
      ...FragmentText
    }
    contentElements {
      ... on ParagraphInterface {
        __typename
        id
        # Here we include only the paragraph types that can actually be used in the field
        # contentElements for this paragraph type. Using the generated union type, we can be sure
        # that all fragments we refer to here can actually be used.
        ... on ParagraphAccordionItemContentElementsUnion {
          ...FragmentParagraphFormattedText
          ...FragmentParagraphImage
          ...FragmentParagraphLink
          ...FragmentParagraphFileAttachments
          ...FragmentParagraphVideo
        }
      }
    }
  }
`);

export const FRAGMENT_PARAGRAPH_LISTING_ARTICLE = graphql(`
  fragment FragmentParagraphListingArticle on ParagraphListingArticle {
    __typename
    id
    paragraphListingArticleHeading: heading
    limit
  }
`);
