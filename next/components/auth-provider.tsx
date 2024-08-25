import { SessionProvider } from "next-auth/react";

import { auth } from "@/auth";

export default async function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  console.log("AuthProvider", session);
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
