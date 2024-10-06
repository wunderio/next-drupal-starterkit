import { unstable_cache } from "next/cache";
import { cache } from "react";
import { AbortError } from "p-retry";

import { drupalClientViewer } from "@/lib/drupal/drupal-client";

import { MenuAvailable } from "../gql/graphql";
import { GET_MENU } from "../graphql/queries";

import { env } from "@/env";
import { queryCacher } from "./query-cacher";

/**
 * Fetches the menu data for a given menu name and locale from the Drupal client.
 *
 * @param name - The name of the menu to fetch.
 * @param locale - The language code for the menu.
 * @returns A promise that resolves to the menu data.
 */
export async function fetchMenu(name: MenuAvailable, locale: string) {
  return await drupalClientViewer.doGraphQlRequest(GET_MENU, {
    name,
    langcode: locale,
  });
}

// Wrapper function to cache getMenu function with react cache
const cachedFetchMenu = queryCacher(fetchMenu);

/**
 * Gets the menu data for a given menu name and locale.
 * If an error occurs during fetching, logs the error and returns null.
 *
 * @param name - The name of the menu to fetch.
 * @param locale - The language code for the menu.
 * @returns A promise that resolves to the menu data or null if an error occurs.
 */
export async function getMenu(name: MenuAvailable, locale: string) {
  try {
    const menus = await cachedFetchMenu(name, locale);
    return menus.menu;
  } catch (error) {
    const type =
      error instanceof AbortError
        ? "GraphQL"
        : error instanceof TypeError
          ? "Network"
          : "Unknown";

    const moreInfo =
      type === "GraphQL"
        ? `Check graphql_compose logs: ${env.NEXT_PUBLIC_DRUPAL_BASE_URL}/admin/reports`
        : "";

    const errorMessage = `${type} Error during GetMenuQuery with $name: "${name}" and $langcode: "${locale}". ${moreInfo}`;
    console.error(JSON.stringify(errorMessage, null, 2));
    return null;
  }
}

/**
 * Retrieves the main and footer menus for a given locale and memoizes the result during the request.
 *
 * @param locale - The language code for the menus.
 * @returns A promise that resolves to an object containing the main and footer menus.
 */
export const getMenus = async (locale: string) => {
  const [main, footer] = await Promise.all(
    ["MAIN", "FOOTER"].map((menu) => getMenu(menu as MenuAvailable, locale)),
  );

  return {
    main: main,
    footer: footer,
  };
};

/**
 * Preloads the menus for a given locale.
 *
 * @param locale - The language code for the menus.
 */
export const preloadMenus = (locale: string) => {
  void getMenus(locale);
};
