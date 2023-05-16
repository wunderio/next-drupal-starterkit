const config = require("./site.config");

module.exports = {
  i18n: {
    localeDetection: false,
    defaultLocale: config.defaultLocale,
    locales: Object.keys(config.locales),
  },
};
