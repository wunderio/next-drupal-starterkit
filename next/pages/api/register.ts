import type { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth/next";
import { drupal } from "lib/drupal";

// import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Because we want to redirect registered users to some
  // other page than the register one, let's get the session:
  // const session = await getServerSession(req, res, authOptions);

  // if there is a session, redirect to the frontpage or user dashboard:
  // if (session) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }

  try {
    if (req.method === "POST") {
      const url = drupal.buildUrl("/user/register");
      const body = JSON.parse(req.body);

      // Submit to Drupal.
      const result = await drupal.fetch(url.toString(), {
        method: "POST",
        body: JSON.stringify({
          name: body.name,
          username: body.username,
          email: body.email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.ok) {
        console.log("Sign-up success:", result);
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
