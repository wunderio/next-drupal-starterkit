import { DrupalClient } from "next-drupal";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { request, RequestDocument, Variables } from "graphql-request";

export class GraphQlDrupalClient extends DrupalClient {
  async doGraphQlRequest<T>(
    query: TypedDocumentNode<T> | RequestDocument,
    variables?: Variables,
    withAuth = false,
  ): Promise<ReturnType<typeof request<T, Variables>>> {
    const endpoint = this.buildUrl("/graphql").toString();
    // The drupal.client has better handling of authentication,
    // here we just add the token to the request headers.
    if (withAuth) {
      const token = await this.getAccessToken();
      const requestHeaders = {
        authorization: `Bearer ${token.access_token}`,
      };
      return await request(endpoint, query, variables, requestHeaders);
    }
    return await request(endpoint, query, variables);
  }
}
