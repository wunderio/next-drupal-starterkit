import { cache } from "react";

import { auth } from "@/auth";

export const getAuth = cache(async () => {
  const session = await auth();

  if (!session) {
    return null;
  }

  return session;
});
