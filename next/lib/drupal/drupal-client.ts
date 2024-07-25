import { DrupalClient } from "next-drupal";
import { type TypedDocumentNode } from "@graphql-typed-document-node/core";
import { request, type RequestDocument, type Variables } from "graphql-request";
import pRetry, { AbortError, type Options } from "p-retry";

import { env } from "@/env";

const RETRY_OPTIONS: Options = {
  retries: env.NODE_ENV === "development" ? 1 : 5,
  onFailedAttempt: ({ attemptNumber, retriesLeft, message }) => {
    // Don't retry GraphQL errors:
    if (message.startsWith("GraphQL Error")) {
      // Throw the relevant part of the error message (e.g. "GraphQL Error (Code: 500)")
      throw new AbortError(message.slice(0, 25));
    }

    console.log(
      `Fetch ${attemptNumber} failed (${retriesLeft} retries remaining)`,
    );
  },
} as const;

const createGraphQlDrupalClient = (clientId: string, clientSecret: string) => {
  class GraphQlDrupalClient extends DrupalClient {
    async doGraphQlRequest<T>(
      query: TypedDocumentNode<T> | RequestDocument,
      variables?: Variables,
    ): Promise<ReturnType<typeof request<T, Variables>>> {
      const url = this.buildUrl("/graphql").toString();

      const headers = {
        authorization: `Bearer ${(await this.getAccessToken()).access_token}`,
      };

      return pRetry(
        () => request(url, query, variables, headers),
        RETRY_OPTIONS,
      );
    }
  }

  return new GraphQlDrupalClient(env.NEXT_PUBLIC_DRUPAL_BASE_URL, {
    fetcher: (input, init) => pRetry(() => fetch(input, init), RETRY_OPTIONS),
    forceIframeSameSiteCookie: env.NODE_ENV === "development",
    auth: {
      clientId,
      clientSecret,
    },
  });
};

// This instance of the client will connect to the Drupal API using a consumer that
// is associated with a role with "regular" permissions. It should be used by default.
export const drupalClientViewer = createGraphQlDrupalClient(
  env.DRUPAL_CLIENT_VIEWER_ID,
  env.DRUPAL_CLIENT_VIEWER_SECRET,
);

// This instance of the client will connect to the Drupal API using a consumer
// which is associated with a role with additional permissions. Use this instance
// when you need to get data for unpublished nodes, like in previews.
export const drupalClientPreviewer = createGraphQlDrupalClient(
  env.DRUPAL_CLIENT_ID,
  env.DRUPAL_CLIENT_SECRET,
);
