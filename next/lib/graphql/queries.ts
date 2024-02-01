import { graphql } from "@/lib/gql";

/**
 * Given a path, this query will return the node, or a redirect.
 */
export const GET_ENTITY_AT_DRUPAL_PATH = graphql(`
  query GetNodeByPath($path: String!, $langcode: String!) {
    route(path: $path, langcode: $langcode) {
      __typename
      ... on RouteInternal {
        __typename
        entity {
          ...FragmentNodeUnion
        }
      }
      ... on RouteRedirect {
        __typename
        status
        url
        internal
      }
    }
  }
`);

/**
 * This query is used get all node paths and fed to
 * getStaticPaths when generating pages. By adjusting the query,
 * we can decide which pages to generate. When creating a new content type,
 * it should be added here.
 */
export const GET_STATIC_PATHS = graphql(`
  query getPagesPaths($number: Int, $langcode: String) {
    nodePages(
      first: $number
      langcode: $langcode
      sortKey: UPDATED_AT
      reverse: true
    ) {
      nodes {
        path
      }
    }
    nodeArticles(
      first: $number
      langcode: $langcode
      sortKey: UPDATED_AT
      reverse: true
    ) {
      nodes {
        path
      }
    }
  }
`);

export const GET_NODE_PATH_BY_ID_AND_LANGCODE = graphql(`
  query getNodePathByIdAndLangcode($id: ID!, $langcode: String!) {
    node(id: $id, langcode: $langcode) {
      ... on NodeInterface {
        path
        langcode {
          id
        }
        status
      }
    }
  }
`);

/** This  query is used to get menus. Here we go 3 levels deep. */
export const GET_MENU = graphql(`
  query getMenu($name: MenuAvailable!, $langcode: String!) {
    menu(name: $name, langcode: $langcode) {
      __typename
      items {
        id
        description
        url
        langcode
        title
        internal
        children {
          id
          description
          url
          langcode
          title
          internal
          children {
            id
            description
            url
            langcode
            title
            internal
          }
        }
      }
    }
  }
`);

export const LISTING_ARTICLES = graphql(`
  query ArticleListing(
    $langcode: String = "en"
    $sticky: Boolean = true
    $offset: Int = 0
    $pageSize: Int = 10
    $page: Int = 0
  ) {
    articlesView(
      page: $page
      pageSize: $pageSize
      filter: { langcode: $langcode, sticky: $sticky }
      offset: $offset
    ) {
      results {
        __typename
        ...FragmentArticleTeaser
      }
      pageInfo {
        offset
        page
        pageSize
        total
      }
    }
  }
`);
