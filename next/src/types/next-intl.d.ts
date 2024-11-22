import en from "../../messages/en.json";

type Messages = typeof en;
export type TranslationKey = MessageKeys<IntlMessages, keyof Messages>;

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}
