import { GetMenuQuery } from "@/lib/gql/graphql";
import { ArticleListingQuery } from "@/lib/gql/graphql";
import { extractEntityFromRouteQueryResult } from "@/lib/graphql/utils";

/**
 * Infer route entity type from the query that fetches it
 */
export type TypedRouteEntity = ReturnType<
  typeof extractEntityFromRouteQueryResult
>;

/**
 * From TypedRouteEntity, create a type for Frontpage data
 */
export type FrontpageType = Extract<
  TypedRouteEntity,
  { __typename: "NodeFrontpage" }
>;

/**
 * From TypedRouteEntity, create a type for Page data
 */
export type PageType = Extract<TypedRouteEntity, { __typename: "NodePage" }>;

/**
 * From TypedRouteEntity, create a type for Article data
 */
export type ArticleType = Extract<
  TypedRouteEntity,
  { __typename: "NodeArticle" }
>;

export type MenuType = GetMenuQuery["menu"];

export type MenuItemType = MenuType["items"][number];

/**
 * We have a representation of an article that we get from the ArticleListingQuery,
 * and we want to get its type to use it in the ArticleTeasers and ArticleTeaser components.
 * So, we can extract the type of NodeArticle from the union by looking at the __typename
 * property.
 *
 */
export type ArticleTeaserType = Extract<
  ArticleListingQuery["articlesView"]["results"][number],
  { __typename: "NodeArticle" }
>;

/**
 * From TypedRouteEntity, create a type for Test Content data
 */
export type TestContentType = Extract<
  TypedRouteEntity,
  { __typename: "NodeTestContent" }
>;
