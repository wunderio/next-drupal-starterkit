import { GetNodeByPathQuery } from "@/lib/gql/graphql";

export const extractEntityFromRouteQueryResult = (data: GetNodeByPathQuery) =>
  data?.route?.__typename == "RouteInternal" && data.route.entity;

export const extractRedirectFromRouteQueryResult = (data: GetNodeByPathQuery) =>
  data?.route?.__typename == "RouteRedirect" && data.route;
