import type { NextApiRequest, NextApiResponse } from "next";
import { drupal } from "lib/drupal";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === "POST") {
      const url = drupal.buildUrl("/user/register?_format=json");
      const body = JSON.parse(req.body);

      // Do a call to drupal to register the user:
      const result = await drupal.fetch(url.toString(), {
        method: "POST",
        body: JSON.stringify({
          name: [{ value: body.name }],
          mail: [{ value: body.mail }],
        }),
        headers: {
          "Content-Type": "application/json",
        },
        // Make sure we are doing this call as
        // anonymous user:
        withAuth: false,
      });

      if (result.ok) {
        res.status(200).end();
      } else {
        console.error("Sign-up failed:", result);
        res.status(result.status).end();
        throw new Error();
      }
    }
  } catch (error) {
    console.error("Sign-up POST failed:", error);
    return res.status(400).json(error.message);
  }
}
