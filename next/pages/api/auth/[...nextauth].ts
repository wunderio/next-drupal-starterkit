import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt_decode from "jwt-decode";

import { drupal } from "@/lib/drupal/drupal-client";

import { env } from "@/env";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      name: "Drupal",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const formData = new URLSearchParams();
        formData.append("grant_type", "password");
        formData.append("client_id", env.DRUPAL_CLIENT_ID);
        formData.append("client_secret", env.DRUPAL_CLIENT_SECRET);
        formData.append("username", credentials.username);
        formData.append("password", credentials.password);

        const url = drupal.buildUrl("/oauth/token");
        // Get access token from Drupal.
        const response = await drupal.fetch(url.toString(), {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        if (!response.ok) {
          return null;
        }

        return await response.json();
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        console.log(user);
        token.accessToken = user.access_token;
        token.accessTokenExpires = Date.now() + user.expires_in * 1000;
        token.refreshToken = user.refresh_token;
      }

      // If token has not expired, return it,
      if (Date.now() < Number(token.accessTokenExpires)) {
        return token;
      }

      // Otherwise, refresh the token.
      return refreshAccessToken(token);
    },
    // eslint-disable-next-line @typescript-eslint/require-await
    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
        const decoded = jwt_decode<{ email: string; username: string }>(
          token.accessToken as string,
        );
        session.user.email = decoded.email;
        session.user.name = decoded.username;
        session.user.image = null;
        session.error = token.error || null;
      }
      return session;
    },
  },
};

// Helper to obtain a new access_token from a refresh token.
async function refreshAccessToken(token) {
  try {
    const formData = new URLSearchParams();

    formData.append("grant_type", "refresh_token");
    formData.append("client_id", env.DRUPAL_CLIENT_ID);
    formData.append("client_secret", env.DRUPAL_CLIENT_SECRET);
    formData.append("refresh_token", token.refreshToken);

    const url = drupal.buildUrl("/oauth/token");

    const response = await drupal.fetch(url.toString(), {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error();
    }

    return {
      ...token,
      accessToken: data.access_token,
      accessTokenExpires: Date.now() + data.expires_in * 1000,
      refreshToken: data.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export default NextAuth(authOptions);
