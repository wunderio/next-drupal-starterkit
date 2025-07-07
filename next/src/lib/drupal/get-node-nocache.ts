import {
  drupalClientPreviewer,
  drupalClientViewer,
} from "@/lib/drupal/drupal-client";
import { GET_ENTITY_AT_DRUPAL_PATH } from "@/lib/graphql/queries";

/**
 * Function to directly fetch a node from Drupal by its path and locale.
 *
 * This function is used to fetch the node data without caching, and
 * can be imported in middleware or other server-side code.
 *
 * @param path The path of the node.
 * @param locale The locale of the node.
 * @param revision The revision of the node.
 * @param isDraftMode If true, fetches the draft version of the node.
 * @returns The fetched node data or null if not found.
 */
export async function fetchNodeByPathQuery(
  path: string,
  locale: string,
  isDraftMode: boolean,
  revision: string = null,
) {
  const drupalClient = isDraftMode ? drupalClientPreviewer : drupalClientViewer;
  return await drupalClient.doGraphQlRequest(GET_ENTITY_AT_DRUPAL_PATH, {
    path,
    langcode: locale,
    revision,
  });
}
