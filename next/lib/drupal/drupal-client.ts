import pRetry from "p-retry";

import { GraphQlDrupalClient } from "./graphql-drupal-client";

import { env } from "@/env";

/**
 * Specifies a custom fetcher function that wraps the fetch function in pRetry.
 */
const fetcher = (input: RequestInfo, init: RequestInit = {}) => {
  const wrappedFetch = () => fetch(input, init);

  return pRetry(wrappedFetch, {
    retries: env.NODE_ENV === "development" ? 0 : 5,
    onFailedAttempt: (error) => {
      console.log(
        `Drupal fetch: attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`,
      );
    },
  });
};

// This instance of the client will connect to Drupal using a consumer that
// is associated with a role with "regular" permissions. It should be used by
// default.
export const drupalClientViewer = new GraphQlDrupalClient(
  env.NEXT_PUBLIC_DRUPAL_BASE_URL,
  {
    fetcher,
    forceIframeSameSiteCookie: env.NODE_ENV === "development",
    auth: {
      clientId: env.DRUPAL_CLIENT_VIEWER_ID,
      clientSecret: env.DRUPAL_CLIENT_VIEWER_SECRET,
    },
  },
);

// This instance of the client will connect to the Drupal API using a consumer
// which is associated with a role with additional permissions. Use this instance
// when you need to get data for unpublished nodes, like in previews.
export const drupalClientPreviewer = new GraphQlDrupalClient(
  env.NEXT_PUBLIC_DRUPAL_BASE_URL,
  {
    fetcher,
    forceIframeSameSiteCookie: env.NODE_ENV === "development",
    auth: {
      clientId: env.DRUPAL_CLIENT_ID,
      clientSecret: env.DRUPAL_CLIENT_SECRET,
    },
  },
);
