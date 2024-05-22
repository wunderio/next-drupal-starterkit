import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

import { drupalClientViewer } from "@/lib/drupal/drupal-client";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Because we want to allow only registered users to submit
  // to the contact webform, let's get the session:
  const session = await getServerSession(req, res, authOptions);
  // The locale is passed in this header:
  const languagePrefix = req.headers["accept-language"];

  // if there is no session, return 401:
  if (!session) {
    res.status(401).end();
  }

  try {
    if (req.method === "POST") {
      const url = drupalClientViewer.buildUrl(
        `/${languagePrefix}/webform_rest/submit`,
      );
      const body = JSON.parse(req.body);

      // Submit to Drupal.
      const result = await drupalClientViewer.fetch(url.toString(), {
        method: "POST",
        body: JSON.stringify({
          webform_id: "contact",
          name: body.name,
          email: body.email,
          message: body.message,
          subject: body.subject,
        }),
        headers: {
          "Content-Type": "application/json",
          // Pass the token to authenticate the request:
          Authorization: `Bearer ${session.accessToken}`, // eslint-disable-line @typescript-eslint/no-base-to-string
        },
      });

      if (result.ok) {
        res.status(200).end();
      } else {
        res.status(result.status).end();
        throw new Error();
      }
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
}
