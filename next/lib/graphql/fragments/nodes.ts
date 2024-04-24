import { graphql } from "gql.tada";

import {
  FRAGMENT_IMAGE,
  FRAGMENT_METATAG,
  FRAGMENT_TEXT_SUMMARY,
} from "./fields";
import {
  FRAGMENT_PARAGRAPH_ACCORDION,
  FRAGMENT_PARAGRAPH_FILE_ATTACHMENTS,
  FRAGMENT_PARAGRAPH_FORMATTED_TEXT,
  FRAGMENT_PARAGRAPH_HERO,
  FRAGMENT_PARAGRAPH_IMAGE,
  FRAGMENT_PARAGRAPH_LINKS,
  FRAGMENT_PARAGRAPH_LISTING_ARTICLE,
  FRAGMENT_PARAGRAPH_VIDEO,
} from "./paragraphs";
import { FRAGMENT_USER } from "./users";

export const FRAGMENT_NODE_ARTICLE = graphql(
  `
    fragment FragmentNodeArticle on NodeArticle {
      excerpt
      sticky
      body {
        ...FragmentTextSummary
      }
      image {
        ...FragmentImage
      }
      author {
        __typename
        ... on User {
          ...FragmentUser
        }
      }
    }
  `,
  [FRAGMENT_TEXT_SUMMARY, FRAGMENT_IMAGE, FRAGMENT_USER],
);

export const FRAGMENT_NODE_FRONTPAGE = graphql(
  `
    fragment FragmentNodeFrontpage on NodeFrontpage {
      contentElements {
        ... on ParagraphInterface {
          __typename
          id
          # Here we include only the paragraph types that can actually be used in the field
          # contentElements for this node type. Using the generated union type, we can be sure
          # that all fragments we use here can actually be used.
          ... on NodeFrontpageContentElementsUnion {
            ...FragmentParagraphFormattedText
            ...FragmentParagraphLink
            ...FragmentParagraphImage
            ...FragmentParagraphVideo
            ...FragmentParagraphFileAttachments
            ...FragmentParagraphHero
            ...FragmentParagraphAccordion
            ...FragmentParagraphListingArticle
          }
        }
      }
    }
  `,
  [
    FRAGMENT_PARAGRAPH_FORMATTED_TEXT,
    FRAGMENT_PARAGRAPH_LINKS,
    FRAGMENT_PARAGRAPH_IMAGE,
    FRAGMENT_PARAGRAPH_VIDEO,
    FRAGMENT_PARAGRAPH_FILE_ATTACHMENTS,
    FRAGMENT_PARAGRAPH_HERO,
    FRAGMENT_PARAGRAPH_ACCORDION,
    FRAGMENT_PARAGRAPH_LISTING_ARTICLE,
  ],
);

export const FRAGMENT_NODE_PAGE = graphql(
  `
    fragment FragmentNodePage on NodePage {
      contentElements {
        ... on ParagraphInterface {
          __typename
          id
          # Here we include only the paragraph types that can actually be used in the field
          # contentElements for this node type. Using the generated union type, we can be sure
          # that all fragments we refer to here can actually be used.
          ... on NodePageContentElementsUnion {
            ...FragmentParagraphFormattedText
            ...FragmentParagraphLink
            ...FragmentParagraphImage
            ...FragmentParagraphVideo
            ...FragmentParagraphFileAttachments
            ...FragmentParagraphHero
            ...FragmentParagraphAccordion
            ...FragmentParagraphListingArticle
            ...FragmentParagraphAccordion
          }
        }
      }
    }
  `,
  [
    FRAGMENT_PARAGRAPH_FORMATTED_TEXT,
    FRAGMENT_PARAGRAPH_LINKS,
    FRAGMENT_PARAGRAPH_IMAGE,
    FRAGMENT_PARAGRAPH_VIDEO,
    FRAGMENT_PARAGRAPH_FILE_ATTACHMENTS,
    FRAGMENT_PARAGRAPH_HERO,
    FRAGMENT_PARAGRAPH_ACCORDION,
    FRAGMENT_PARAGRAPH_LISTING_ARTICLE,
    FRAGMENT_PARAGRAPH_ACCORDION,
  ],
);

export const FRAGMENT_ARTICLE_TEASER = graphql(`
  fragment FragmentArticleTeaser on NodeArticle {
    __typename
    id
    image {
      ...FragmentImage
    }
    path
    title
    sticky
    excerpt
    created {
      timestamp
    }
    author {
      __typename
      ... on User {
        ...FragmentUser
      }
    }
  }
`);

export const FRAGMENT_NODE_UNION = graphql(
  `
    fragment FragmentNodeUnion on NodeInterface {
      __typename
      id
      title
      status
      path
      langcode {
        id
      }
      created {
        timestamp
      }
      changed {
        timestamp
      }
      metatag {
        ...FragmentMetaTag
      }
      ...FragmentNodeArticle
      ...FragmentNodeFrontpage
      ...FragmentNodePage
    }
  `,
  [
    FRAGMENT_METATAG,
    FRAGMENT_NODE_ARTICLE,
    FRAGMENT_NODE_FRONTPAGE,
    FRAGMENT_NODE_PAGE,
  ],
);
