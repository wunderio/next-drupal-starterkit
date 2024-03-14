import { GetStaticPropsContext } from "next";
import pRetry from "p-retry";

import { drupal } from "@/lib/drupal/drupal-client";

import { MenuAvailable } from "../gql/graphql";
import { GET_MENU } from "../graphql/queries";

export async function getMenus({ locale }: GetStaticPropsContext) {
  const [main, footer] = await pRetry(
    () =>
      Promise.all(
        ["MAIN", "FOOTER"].map((menu) =>
          drupal.doGraphQlRequest(GET_MENU, {
            name: menu as MenuAvailable,
            langcode: locale,
          }),
        ),
      ),
    { retries: 5 },
  );

  return {
    main: main.menu,
    footer: footer.menu,
  };
}
