import type { NextApiRequest, NextApiResponse } from "next";

import { drupalClientViewer } from "@/lib/drupal/drupal-client";

import { env } from "@/env";
/**
 * Example backend proxy for Elasticsearch Search-UI frontend client.
 */
const Search = async (req: NextApiRequest, res: NextApiResponse) => {
  // The locale is passed in this header:
  const languagePrefix = req.headers["accept-language"];

  // Create the url to call in drupal:
  const ProxyUrl = `${env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${languagePrefix}/wunder_search/proxy`;

  try {
    const result = await drupalClientViewer.fetch(ProxyUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(req.body),
    });

    if (!result.ok) {
      res.status(result.status).json({ error: result.statusText });
      const message = `Error performing search: ${result.status}: ${result.statusText}`;
      throw new Error(message);
    }

    res.statusCode = result.status;
    res.send(await result.json());
  } catch (error) {
    console.error("Fetch error:", JSON.stringify(error.message, null, 2));
    // Respond with an appropriate error status code or message
    res.status(500).json({ error: error.message });
  }
};

export default Search;
