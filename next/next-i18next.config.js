const { i18nConfig } = require("./i18n");

module.exports = {
  i18n: {
    defaultLocale: i18nConfig.defaultLocale,
    locales: Object.keys(i18nConfig.locales),
  },
  ns: "common",
  defaultNS: "common",
  fallbackNS: "common",
  react: {
    useSuspense: false,
  },
  interpolation: {
    escapeValue: false,
  },
};
