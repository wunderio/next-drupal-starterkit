import { DefaultUser } from "next-auth";
import { DrupalMenuLinkContent } from "next-drupal";

// We have applied a patch on the Drupal side that adds the langcode
// property to the response of jsonapi menus, so we extend the type here:
export interface DrupalMenuLinkContentWithLangcode
  extends DrupalMenuLinkContent {
  langcode?: string;
  items?: DrupalMenuLinkContentWithLangcode[];
}

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
