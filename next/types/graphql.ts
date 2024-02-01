import { DocumentType } from "@/lib/gql";
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

/**
 * We have a representation of an article that we get from the ArticleListingQuery,
 * and we want to get its type to use it in the ArticleTeasers and ArticleTeaser components.
 *
 * The "results" property of the query will return a union of all possible defined
 * nodeTypes, but we know, because of filters in the view and the fragment we have defined,
 * that only NodeArticles will be returned. For all other node types, the type will only
 * have the __typename property, while for article it will have typename and other properties,
 * including "id".
 *
 * So, we can extract the type of NodeArticle from the union, by looking for the type that can have the id property.
 *
 */
export type ArticleTeaserType = Extract<
  ArticleListingQuery["articlesView"]["results"][number],
  { id: string }
>;
