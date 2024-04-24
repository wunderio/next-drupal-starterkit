import pRetry from "p-retry";

import { GraphQlDrupalClient } from "./graphql-drupal-client";

import { env } from "@/env";

const getFetcher =
  () =>
  async (input: RequestInfo, init: RequestInit = {}) => {
    const wrappedFetch = async () => {
      return await fetch(input, {
        ...init,
      });
    };
    // Return the pRetry wrapped fetch function:
    return pRetry(wrappedFetch, {
      retries: env.NODE_ENV === "development" ? 0 : 5,
      onFailedAttempt: (error) => {
        console.log(
          `Drupal fetch: attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`,
        );
      },
    });
  };

export const drupal = new GraphQlDrupalClient(env.NEXT_PUBLIC_DRUPAL_BASE_URL, {
  // We specify our own fetcher to apply pRetry to it:
  fetcher: getFetcher(),
  forceIframeSameSiteCookie: env.NODE_ENV === "development",
  auth: {
    clientId: env.DRUPAL_CLIENT_ID,
    clientSecret: env.DRUPAL_CLIENT_SECRET,
  },
});
