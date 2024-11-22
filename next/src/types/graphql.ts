import { GetMenuQuery } from "@/lib/gql/graphql";
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
