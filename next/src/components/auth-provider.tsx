import { SessionProvider } from "next-auth/react";

import { getAuth } from "@/lib/auth/get-auth";

export default async function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuth();

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
