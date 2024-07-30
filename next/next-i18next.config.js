const config = require("./site.config");

module.exports = {
  i18n: {
    defaultLocale: config.defaultLocale,
    locales: Object.keys(config.locales),
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
