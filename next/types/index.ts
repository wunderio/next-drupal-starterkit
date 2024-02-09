import { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser;
    accessToken?: unknown;
    error?: unknown;
  }
  interface User extends DefaultUser {
    role: string;
    access_token: string;
    expires_in: number;
    refresh_token: string;
  }
}
