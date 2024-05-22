import type { NextApiRequest, NextApiResponse } from "next";

import { drupalClientViewer } from "@/lib/drupal/drupal-client";

import siteConfig from "@/site.config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === "POST") {
      const url = drupalClientViewer.buildUrl("/user/register?_format=json");
      const body = JSON.parse(req.body);

      // The locale is passed in this header:
      const localeHeader = req.headers["accept-language"];

      // Do a call to drupal to register the user:
      const result = await drupalClientViewer.fetch(url.toString(), {
        method: "POST",
        body: JSON.stringify({
          name: [{ value: body.name }],
          mail: [{ value: body.mail }],
          preferred_langcode: [
            {
              value: localeHeader || siteConfig.defaultLocale,
            },
          ],
        }),
        headers: {
          "Content-Type": "application/json",
        },
        // Make sure we are doing this call as
        // anonymous user:
        withAuth: false,
      });

      if (!result.ok) {
        res.status(result.status).json({ error: result.statusText });
        const message = `Error registering user: ${result.status}: ${result.statusText}`;
        throw new Error(message);
      }
      //The operation was successful:
      res.status(200).json({ success: true });
    }
  } catch (error) {
    console.error("Fetch error:", JSON.stringify(error.message, null, 2));
    // Respond with an appropriate error status code or message
    res.status(500).json({ error: error.message });
  }
}
