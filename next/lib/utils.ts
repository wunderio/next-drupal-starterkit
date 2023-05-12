import { GetStaticPropsContext } from "next";
import { DrupalClient, DrupalNode } from "next-drupal";
import { twMerge } from "tailwind-merge";
import { ClassNameValue } from "tailwind-merge/dist/lib/tw-join";

import { Translations } from "@/lib/contexts/language-links-context";

import { env } from "@/env";

export function cn(...inputs: ClassNameValue[]) {
  return twMerge(inputs);
}

export function formatDate(input: string, locale: string): string {
  const date = new Date(input);
  return date.toLocaleDateString(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateComplete(input: string, locale: string): string {
  const date = new Date(input);
  return date.toLocaleDateString(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "UTC",
    timeZoneName: "short",
  });
}

export function absoluteUrl(input: string) {
  return `${env.NEXT_PUBLIC_DRUPAL_BASE_URL}${input}`;
}

/**
 * Given a node, it will return the node translations for it.
 */
export const getNodeTranslatedVersions = async (
  node: DrupalNode,
  context: GetStaticPropsContext,
  drupal: DrupalClient
) => {
  const nodeTranslations: Translations = {};
  for (let i = 0; i < context.locales.length; i++) {
    const lang = context.locales[i];
    const translated = await drupal.getResource(node.type, node.id, {
      locale: lang,
      defaultLocale: context.defaultLocale,
      withAuth: true,
    });
    // Only consider a translation if there is actually a translated node:
    nodeTranslations[translated.langcode] = translated.path.alias;
  }
  return nodeTranslations;
};

export function isRelative(url: string) {
  return !new RegExp("^(?:[a-z]+:)?//", "i").test(url);
}

/**
 * Gets a youtube id from a youtube url
 * Taken from https://gist.github.com/takien/4077195
 */
export function getYouTubeId(url: string) {
  const arr = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return undefined !== arr[2] ? arr[2].split(/[^\w-]/i)[0] : arr[0];
}
