import { DrupalClient } from "next-drupal";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { request, RequestDocument, Variables } from "graphql-request";
import pRetry from "p-retry";

import { env } from "@/env";

export class GraphQlDrupalClient extends DrupalClient {
  async doGraphQlRequest<T>(
    query: TypedDocumentNode<T> | RequestDocument,
    variables?: Variables,
    withAuth = true,
  ): Promise<ReturnType<typeof request<T, Variables>>> {
    const endpoint = this.buildUrl("/graphql").toString();
    let requestHeaders: Record<string, string> = {};
    // The drupal.client has better handling of authentication,
    // here we just add the token to the request headers.
    if (withAuth) {
      const token = await this.getAccessToken();
      requestHeaders = {
        authorization: `Bearer ${token.access_token}`,
      };
    }
    // Wrap the request in pRetry to retry failed attempts.
    return await pRetry(
      () => request(endpoint, query, variables, requestHeaders),
      {
        retries: env.NODE_ENV === "development" ? 0 : 5,
        onFailedAttempt: (error) => {
          console.log(
            `Drupal GraphQl: attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`,
          );
        },
      },
    );
  }
}
