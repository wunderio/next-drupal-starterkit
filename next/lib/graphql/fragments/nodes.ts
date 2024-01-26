import { graphql } from "@/lib/gql";

export const FRAGMENT_NODE_UNION = graphql(`
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
`);

export const FRAGMENT_NODE_ARTICLE = graphql(`
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
`);

export const FRAGMENT_NODE_FRONTPAGE = graphql(`
  fragment FragmentNodeFrontpage on NodeFrontpage {
    contentElements {
      ...FragmentParagraphUnion
    }
  }
`);

export const FRAGMENT_NODE_PAGE = graphql(`
  fragment FragmentNodePage on NodePage {
    contentElements {
      ...FragmentParagraphUnion
    }
  }
`);
