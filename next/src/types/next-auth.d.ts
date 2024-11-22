import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface SessionUser {
    user: DefaultSession["user"];
  }

  interface Session extends SessionUser {
    accessToken?: unknown;
    error?: unknown;
  }

  interface User extends SessionUser {
    role: string;
    access_token: string;
    expires_in: number;
    refresh_token: string;
  }
}
