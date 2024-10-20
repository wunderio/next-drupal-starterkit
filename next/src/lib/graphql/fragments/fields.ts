import { graphql } from "@/lib/gql";

export const FRAGMENT_TEXT = graphql(`
  fragment FragmentText on Text {
    value
    processed
    format
  }
`);

export const FRAGMENT_TEXT_SUMMARY = graphql(`
  fragment FragmentTextSummary on TextSummary {
    value
    processed
    format
    summary
  }
`);

export const FRAGMENT_FORMATTED_TITLE = graphql(`
  fragment FragmentFormattedTitle on Text {
    value
    processed
    format
  }
`);

export const FRAGMENT_LINK = graphql(`
  fragment FragmentLink on Link {
    __typename
    title
    url
    internal
  }
`);

export const FRAGMENT_FILE = graphql(`
  fragment FragmentFile on File {
    name
    url
    size
    mime
    description
  }
`);

export const FRAGMENT_IMAGE = graphql(`
  fragment FragmentImage on Image {
    url
    width
    height
    alt
    title
    size
    mime
  }
`);

export const FRAGMENT_METATAG = graphql(`
  fragment FragmentMetaTag on MetaTagValue {
    __typename
    tag
    attributes {
      name
      content
    }
  }
`);

export const FRAGMENT_NODE_TRANSLATION = graphql(`
  fragment FragmentNodeTranslation on Translation {
    __typename
    path
    langcode {
      id
    }
  }
`);
