import type { NextApiRequest, NextApiResponse } from "next";

import { env } from "@/env";

/**
 * Example backend proxy for Elasticsearch Search-UI frontend client.
 */
const Search = async (req: NextApiRequest, res: NextApiResponse) => {
  // The locale is passed in this header:
  const languagePrefix = req.headers["accept-language"];

  // Create the url to call in drupal:
  const ProxyUrl = `${env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${languagePrefix}/wunder_search/proxy`;

  const response = await fetch(ProxyUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(req.body),
  });

  res.statusCode = response.status;
  res.send(await response.json());
};

export default Search;
