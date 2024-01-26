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
export type Frontpage = Extract<
  TypedRouteEntity,
  { __typename: "NodeFrontpage" }
>;

/**
 * From TypedRouteEntity, create a type for Page data
 */
export type PageType = Extract<TypedRouteEntity, { __typename: "NodePage" }>;

/**
 * From TypedRouteEntity, create a type for BlogPost data
 */
export type ArticleType = Extract<
  TypedRouteEntity,
  { __typename: "NodeArticle" }
>;

/**
 * Union of all possible paragraphs
 * ...or at least, those that can exist on contentElements - is that the same thing?
 */
export type ParagraphType = PageType["contentElements"][number];

export type MenuType = GetMenuQuery["menu"];
