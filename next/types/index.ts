import { DrupalMenuLinkContent } from "next-drupal";

// We have applied a patch on the Drupal side that adds the langcode
// property to the response of jsonapi menus, so we extend the type here:
export interface DrupalMenuLinkContentWithLangcode
  extends DrupalMenuLinkContent {
  langcode?: string;
  items?: DrupalMenuLinkContentWithLangcode[];
}

export type ResourceType =
  | "node--frontpage"
  | "node--landing_page"
  | "node--article";
